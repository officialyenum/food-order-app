import React, {useContext, useState} from 'react';
import Modal from '../UI/Modal';
import  classes from './Cart.module.css'
import CartContext from '../../store/context/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart = (props) => {
    const [isCheckOut, setIsCheckOut] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [didSubmit, setDidSubmit] = useState(false)
    const cartCtx = useContext(CartContext)
    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems = cartCtx.items.length > 0;

    const cartItemRemoveHandler = id => {
      cartCtx.removeItem(id)
    }

    const cartItemAddHandler = item => {
      cartCtx.addItem(item)
    }

    const orderHandler = () => {
      setIsCheckOut(true);
    }
    const submitOrderHandler = async (userData) => {
      try {
        setIsSubmitting(true)
        const response = await fetch('https://hook-http-f2866-default-rtdb.firebaseio.com/orders.json',{
          method:'POST',
          body:JSON.stringify({
            user: userData,
            orderedItems: cartCtx.items
          })
        })
        setIsSubmitting(false);
        if (!response.ok) {
          throw new Error('something went wrong');
        }
        setDidSubmit(true);
        cartCtx.clearCart();
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }

    const cartItems =<ul className={classes['cart-items']}>{cartCtx.items.map((item) => 
    <CartItem 
      key={item.id} 
      id={item.id} 
      name={item.name}
      amount={item.amount}
      price={item.price}
      onAdd={cartItemAddHandler.bind(null, item)}
      onRemove={cartItemRemoveHandler.bind(null, item.id)}
    />)}</ul> ;

    const cartModalContent = (<>
      {cartItems}
        <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        {isCheckOut && <Checkout onConfirm={submitOrderHandler} onClose={props.onHideCart}/>}
        {!isCheckOut && (
          <div className={classes.actions}>
              <button className={classes['button--alt']} onClick={props.onHideCart}>Close</button>
              {hasItems && <button className={classes.button} onClick={orderHandler}>Order</button>}
          </div>
        )}
      </>);

    const isSubmittingModalContent = <p> Sending Order data.... </p>;
    const didSubmitModalContent = (<>
      <p> Successfully sent the Order! </p>
      <div className={classes.actions}>
        <button className={classes.button} onClick={props.onHideCart}>Close</button>
      </div>
    </>)
    return (
      <Modal onClose={props.onHideCart} >
          {!isSubmitting && !didSubmit && cartModalContent}
          {isSubmitting && isSubmittingModalContent}
          {!isSubmitting && didSubmit && didSubmitModalContent}
      </Modal>
    )
}

export default Cart