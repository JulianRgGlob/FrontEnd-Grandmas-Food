import { combineReducers } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import productsReducer from './productsSlice';
import imagesReducer from './imagesSlice';
import authReducer from './authSlice';
import modalReducer from './modalSlice';
import detailCartItemReducer from './detailCartItemsSlice';
import navbarReducer from './navbarSlice';

const rootReducer = combineReducers({
  cart: cartReducer,
  products: productsReducer,
  images: imagesReducer,
  auth: authReducer,
  modal: modalReducer,
  detail: detailCartItemReducer,
  navbar: navbarReducer,
});

export default rootReducer;
