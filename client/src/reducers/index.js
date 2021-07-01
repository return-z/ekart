import { combineReducers } from 'redux';

import items from './items';
import auth from './auth';
import cart from './cart'

export const reducers = combineReducers({ items, auth, cart });
