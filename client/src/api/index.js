import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
  if (localStorage.getItem('profile')) {
    req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return req;
});

export const fetchItems = () => API.get('/items');
export const addItem = (itemData) => API.post('/items', itemData);
export const itemProperties = (id) => API.post(`/items/${id}`);

export const signIn = (formData) => API.post('/user/signin', formData);
export const signUp = (formData) => API.post('/user/signup', formData);

export const fetchCartItems = (id) => API.post('/user/cart', id);
export const addToCart = (itemData) => API.patch('/user/cart', itemData);
export const increaseQuantity = (id) => API.patch('/user/cart/incquantity', id);
export const decreaseQuantity = (id) => API.patch('/user/cart/decquantity', id);
export const deleteCartItem = (itemData) => API.patch('/user/cart/delete', itemData);