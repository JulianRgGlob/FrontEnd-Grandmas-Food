import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: localStorage.getItem('carts')
    ? JSON.parse(localStorage.getItem('carts'))
    : [],
  statusTab: false,
  quantity:1,
  totalQuantity:0,
  userId:null,
}
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      console.log('Productos cart:', action.payload)

      const { productId, quantity, userId } = action.payload
      if(!userId){
        console.error('No userId provided');
        return
      }
      const cartKey = `cart-${userId}`
      const existingCart = JSON.parse(localStorage.getItem(cartKey)) || []

      const indexProductId = state.items.findIndex(
        (item) => item.productId === productId
      )
      if (indexProductId >= 0) {
        existingCart[indexProductId].quantity += quantity
      } else {
        existingCart.push({ productId, quantity })
      }
      state.items = existingCart
      console.log('Productos cart:', state.items)
      localStorage.setItem('cartsKey', JSON.stringify(existingCart))
    },
    changeQuanity(state, action) {
      const { productId, quantity } = action.payload
      const indexProductId = state.items.findIndex(
        (item) => item.productId === productId
      )
      if (indexProductId >= 0) {
        if (quantity <= 0) {
          state.items.splice(indexProductId, 1)
        } else {
          state.items[indexProductId].quantity = quantity
        }
      } else {
        state.items = state.items.filter((item) => item.productId !== productId)
      }
      localStorage.setItem('carts', JSON.stringify(state.items))
    },
    toggleStatusTab(state) {
      state.statusTab = !state.statusTab;
    },
    setQuantity(state,action){
      state.quantity = action.payload
    },
    setTotalQuantity(state,action){
      state.totalQuantity = action.payload
    }
  },
})
export const { addToCart, changeQuanity, toggleStatusTab,setQuantity,setTotalQuantity } = cartSlice.actions
export default cartSlice.reducer
