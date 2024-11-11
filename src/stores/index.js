import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cartSlice'
import productsReducer from './productsSlice'
import { thunk } from 'redux-thunk'
import imagesReducer from './imagesSlice'
import authReducer from './authSlice'
import modalReducer from './modalSlice'
import detailCartItemReducer from './detailCartItemsSlice'
import navbarReducer from './navbarSlice'
const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
    images: imagesReducer,
    auth: authReducer,
    modal: modalReducer,
    detail: detailCartItemReducer,
    navbar: navbarReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
})

export default store
