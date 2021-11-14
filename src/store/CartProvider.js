import React, { useReducer } from 'react';
import CartContext from './cart-context';

const defaultCartState = {
  items: [],
  totalAmount: 0,
};

const cartReducer = (state, action) => {
  if (action.type === 'ADD') {
    const updatedTotal =
      state.totalAmount + action.item.price + action.item.amount;

    const existingcartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );

    const existingCartItem = state.items[existingcartItemIndex];
    let updatedItem;
    let updatedItems;

    if (existingCartItem) {
      updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingcartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotal,
    };
  }
  if (action.type === 'REMOVE') {
    const existingcartItemIndex = state.items.findIndex();
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
