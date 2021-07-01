import { FETCH_ITEMS, ADD_ITEM } from "../constants/items";
import * as api from '../api/index';

export const fetchItems = () => async (dispatch) => {
  try {
    const { data } = await api.fetchItems();
    dispatch({ type : FETCH_ITEMS, payload : data });
  } catch (error) {
    console.log(error);
  }
};

export const addItem = (item) => async (dispatch) => {
  try {
    const { data } = await api.addItem(item);
    dispatch({ type : ADD_ITEM, payload: data });
  } catch (error) {
    console.log(error);
  }
}