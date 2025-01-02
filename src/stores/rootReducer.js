import { combineReducers } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import productsReducer from './productsSlice';
import imagesReducer from './imagesSlice';
import authReducer from './authSlice';
import modalReducer from './modalSlice';
import detailCartItemReducer from './detailCartItemsSlice';
import navbarReducer from './navbarSlice';
import usersReducer from './usersSlice';
const rootReducer = combineReducers({
  cart: cartReducer,
  products: productsReducer,
  images: imagesReducer,
  auth: authReducer,
  modal: modalReducer,
  detail: detailCartItemReducer,
  navbar: navbarReducer,
  users: usersReducer,
});

export default rootReducer;
