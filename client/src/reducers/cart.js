import { FETCH_CART_ITEMS, ADD_TO_CART, DELETE_CART_ITEM, CHANGE_QUANTITY } from "../constants/items"; 

export default (cartItems=[], action) => {
  switch (action.type) {
    case FETCH_CART_ITEMS:
      return action.payload;
    case ADD_TO_CART:
      return action.payload;
    case DELETE_CART_ITEM:
        return action.payload;
    case CHANGE_QUANTITY:
      return action.payload;
    default:
      return cartItems;
  }
}