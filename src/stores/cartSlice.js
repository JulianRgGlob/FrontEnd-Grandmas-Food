import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  items: localStorage.getItem('carts')
    ? JSON.parse(localStorage.getItem('carts'))
    : [],
  statusTab: false,
  quantity:1,
  totalQuantity:0,
}
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      console.log('Productos cart:', action.payload)

      const { productId, quantity } = action.payload
      const indexProductId = state.items.findIndex(
        (item) => item.productId === productId
      )
      if (indexProductId >= 0) {
        state.items[indexProductId].quantity += quantity
      } else {
        state.items.push({ productId, quantity })
      }
      localStorage.setItem('carts', JSON.stringify(state.items))
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
      if (state.statusTab === false) {
        state.statusTab = true
      } else {
        state.statusTab = false
      }
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
