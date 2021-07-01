import { FETCH_CART_ITEMS, ADD_TO_CART, CHANGE_QUANTITY, DELETE_CART_ITEM } from '../constants/items';
import * as api from '../api/index';

export const fetchCartItems = (id) => async (dispatch) => {
  try {
    const { data } = await api.fetchCartItems(id);
    dispatch({ type : FETCH_CART_ITEMS, payload : data });
  } catch (error) {
    console.log(error);
  }
};

export const addToCart = (itemData) => async (dispatch) => {
  try {
    const { data } = await api.addToCart(itemData);
    dispatch({ type : ADD_TO_CART, payload : data });
  } catch (error) {
    console.log(error);
  }
};

export const decreaseQuantity = (itemData) => async (dispatch) => {
  try {
    const { data } = await api.decreaseQuantity(itemData);
    dispatch({ type : CHANGE_QUANTITY, payload : data });
  } catch (error) {
    console.log(error);
  }
}

export const deleteCartItem = (itemData) => async (dispatch) => {
  try {
    const { data } = await api.deleteCartItem(itemData);
    dispatch({ type : DELETE_CART_ITEM, payload : data });
  } catch (error) {
    console.log(error);
  }
}

export const increaseQuantity = (itemData) => async (dispatch) => {
  try {
    const { data } = await api.increaseQuantity(itemData);
    dispatch({ type : CHANGE_QUANTITY, payload : data });
  } catch (error) {
    console.log(error);
  }
}



