

import React,{ useReducer } from 'react';
import CartContext from '../context/cart-context';

const defaultCartState = {
    items: [],
    totalAmount: 0,
}
const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_ITEM':
            const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount
            
            let updatedItems;
            const existingCartItemIndex = state.items.findIndex((item) => item.id === action.item.id);
            const existingCartItem = state.items[existingCartItemIndex];

            if(existingCartItem){
                const updatedItem = {
                    ...existingCartItem,
                    amount: existingCartItem.amount + action.item.amount
                }
                updatedItems = [...state.items];
                updatedItems[existingCartItemIndex] = updatedItem;
            }else{
                updatedItems = state.items.concat(action.item);
            }
            
            return {
                items: updatedItems,
                totalAmount: updatedTotalAmount
            }
        case 'REMOVE_ITEM':
            const existCartItemIndex = state.items.findIndex((item) => item.id === action.id);
            const existCartItem = state.items[existCartItemIndex];
            const updateTotalAmount = state.totalAmount - existCartItem.price;

            let newItems;
            if (existCartItem.amount === 1) {
                newItems = state.items.filter((item) => item.id !== action.id);
            }else{
                const updatedItem = {...existCartItem, amount: existCartItem.amount -1}
                newItems = [...state.items];
                newItems[existCartItemIndex] = updatedItem;
            }
            return {
                items: newItems,
                totalAmount: updateTotalAmount
            }
        default:
            return defaultCartState;
    }
} 
const CartProvider = (props) => {

    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);
    const addItemsHandler = (item) => {
        dispatchCartAction({
            type: 'ADD_ITEM',
            item: item
        })
    };
    const removeItemHandler = (id) => {
        dispatchCartAction({
            type: 'REMOVE_ITEM',
            id: id
        })
    };

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemsHandler,
        removeItem: removeItemHandler
    }

    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
}

export default CartProvider