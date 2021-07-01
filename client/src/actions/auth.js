import * as api from '../api';
import { AUTH } from '../constants/items';

export const signin = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signIn(formData);
    dispatch({ type : AUTH, data })
    console.log('dispatched');
    history.push('/');
  } catch (error) {
    console.log(error);
  }
}

export const signup = (formData, history) => async (dispatch) => {
  try {
    const { data } = await api.signUp(formData);
    console.log('hello');
    dispatch({ type : AUTH, data })
    history.push('/');
  } catch (error) {
    console.log(error);
  }
}