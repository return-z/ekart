import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';

export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) return res.status(404).json({ message : "User don't exist" });
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    if (!isPasswordCorrect) return res.status(400).json( { message : "Invaild Credentials" })
    const token = jwt.sign({ email : existingUser.email, id : existingUser._id }, 'test'); 
    res.status(200).json({ result : existingUser, token });
  } catch (error) {
    res.status(500).json({ message : "something went wrong..." });
  }
}

export const signup = async (req, res) => {
  const { email, password, confirmPassword , firstName, lastName } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message : "user with this id already exists" });
    if (password !== confirmPassword) return res.status(400).json({ message : "passwords don't match" });
    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await User.create({ email, password : hashedPassword, name : `${firstName} ${lastName}`});
    const token = jwt.sign({ email : result.email, id: result._id }, 'test', { expiresIn : "1h"});
    res.status(200).json({ result, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message : 'something went wrong! please try again'});
  }
}

export const addToCart = async (req, res) => {
  const { item, userId } = req.body;
  const user = await User.findOne({ _id : userId });
  const index = user?.cart.findIndex((obj) => obj._id === item._id );
  if (index === -1){
    user.cart.push({ ...item, quantity : 1 });
  } else{
    user.cart[index].quantity++;
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, user, { new: true });
    res.json(updatedUser.cart);
  } catch (error) {
    res.json(error)
  }
}

export const fetchCartItems = async(req, res) => {
  const { userId } = req.body;
  const user = await User.findOne({ _id : userId });
  try {
    res.status(200).json(user.cart); 
  } catch(error) {
    res.status(404).json({ message : error.message });
  }
}

export const decreaseQuantity = async (req, res) => {
  const { userId, itemId } = req.body;
  const user = await User.findOne({ _id : userId });
  const index = user?.cart.findIndex((obj) => obj._id === itemId);
  if (index !== -1){
    user.cart[index].quantity--;
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, user, { new: true });
    res.status(200).json(updatedUser.cart); 
  } catch(error) {
    res.status(404).json({ message : error.message });
  }
}

export const increaseQuantity = async (req, res) => {
  const { userId, itemId } = req.body;
  const user = await User.findOne({ _id : userId });
  const index = user?.cart.findIndex((obj) => obj._id === itemId);
  if (index !== -1){
    user.cart[index].quantity++;
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, user, { new: true });
    res.status(200).json(updatedUser.cart); 
  } catch(error) {
    res.status(404).json({ message : error.message });
  }
}

export const deleteCartItem = async (req, res) => {
  const { userId, itemId } = req.body;
  const user = await User.findOne({ _id : userId });
  user.cart = user.cart.filter((item) => item._id !== itemId);
  try {
    const updatedUser = await User.findByIdAndUpdate(userId, user, { new: true });
    res.status(200).json(updatedUser.cart); 
  } catch(error) {
    res.status(404).json({ message : error.message });
  }
}

