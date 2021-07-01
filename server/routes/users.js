import express from 'express';

import { addToCart, signin, signup, fetchCartItems, decreaseQuantity, increaseQuantity, deleteCartItem } from '../controllers/user.js';


const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);
router.post('/cart', fetchCartItems);
router.patch('/cart', addToCart)
router.patch('/cart/decquantity', decreaseQuantity);
router.patch('/cart/incquantity', increaseQuantity);
router.patch('/cart/delete', deleteCartItem);

export default router;