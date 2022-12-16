import React,{useContext, useEffect, useState} from 'react'
import CartIcon from "../Cart/CartIcon";
import CartContext from '../../store/context/cart-context';
import classes from "./HeaderCartButton.module.css"

const HeaderCartButton = (props) => {
  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false);
  const cartCtx = useContext(CartContext);
  const { items } = cartCtx
  const itemCount = items.reduce((currNum, item)=>{
    return currNum + item.amount;
  },0);

  const btnClasses = `${classes.button} ${btnIsHighlighted ? classes.bump : ''}`;

  useEffect(() => {
    setBtnIsHighlighted(true);

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false)
    }, 300);
  
    return () => {
      clearTimeout(timer);
    }
  }, [items])
  
  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={classes.icon}><CartIcon/></span>
      <span>Your Cart</span>
      <span className={classes.badge}>{itemCount}</span>
    </button>
  )
}

export default HeaderCartButton