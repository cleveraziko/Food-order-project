import React, { useReducer } from 'react';
import CartContext from './cart-context';

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === 'ADD') {
    const updatedItems = state.items.concat(action.item);
    const updatedTotal =
      state.totalAmount + action.item.price + action.item.amount;
    return {
      items: updatedItems,
      totalAmount: updatedTotal,
    };
  }

  return defaultCartState;
};

function CartProvider(props) {
  const [cartState, dispatchcartaction] = useReducer(
    cartReducer,
    defaultCartState
  );
  const addItemHandler = (item) => {
    dispatchcartaction({
      type: 'ADD',
      item: item,
    });
  };
  const removeItemHandler = (id) => {
    dispatchcartaction({
      type: 'REMOVE',
      id: id,
    });
  };
  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItem: addItemHandler,
    removeItem: removeItemHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
}

export default CartProvider;
