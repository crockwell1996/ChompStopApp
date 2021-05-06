import * as React from 'react';
import cartGlobals from './ordering.global';
import OrderSummaryHelpers from './order-summary';

const cartItems = cartGlobals.cart;

OrderSummaryHelpers.calculateOrderSummary();

const UpdateCart = item => {
  if (item.qty) {
    const isInCart = cartItems.some((cartItem, index) => {
      if (item.title === cartItem.title) {
        item.qty += cartItem.qty;
        cartGlobals.cart.splice(index, 1, item);
        return true;
      }
    });
    if (!isInCart) {
      cartGlobals.cart.push(item);
    }
  }
};

const UpdateCartLineItem = item => {
  if (item.qty) {
    const isInCart = cartItems.some((cartItem, index) => {
      if (item.title === cartItem.title) {
        cartGlobals.cart.splice(index, 1, item);
        return true;
      }
    });
    if (!isInCart) {
      cartGlobals.cart.push(item);
    }
  }
};

const RemoveFromCart = item => {
  cartItems.forEach((cartItem, index) => {
    if (cartItem.title === item.title) {
      cartGlobals.cart.splice(index, 1);
    }
  });
};

const CheckoutHelpers = {
  RemoveFromCart,
  UpdateCart,
  UpdateCartLineItem,
};

export default CheckoutHelpers;
