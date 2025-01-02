import { createSlice } from '@reduxjs/toolkit'

const loadCartFromLocalStorage = (userId) => {
  const allCarts = JSON.parse(localStorage.getItem('allCarts')) || [];
  const userCart = allCarts.find((cart) => cart.userId === userId);
  return userCart?.items || [];
};

const initialState = {
  items: [],
  statusTab: false,
  quantity: 1,
  totalQuantity: 0,
  userId: null,
  selectedUserId: null,
  rows:[],
  editRows:{},
}

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    initializeCart(state, action) {
      const { userId } = action.payload;
    
      if (!userId) {
        console.error('No userId provided');
        return;
      }
    
      state.userId = userId;
      state.items = loadCartFromLocalStorage(userId);
      state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
    },
    setCartItems(state, action) {
      state.items = action.payload
    },
    addToCart(state, action) {
      const { productId, quantity, userId } = action.payload;
    
      if (!userId) {
        console.error('No userId provided');
        return;
      }
    
      const allCarts = JSON.parse(localStorage.getItem('allCarts')) || [];
      const userCartIndex = allCarts.findIndex((cart) => cart.userId === userId);
    
      if (userCartIndex >= 0) {
        const userCart = allCarts[userCartIndex];
        const productIndex = userCart.items.findIndex(
          (item) => item.productId === productId
        );
    
        if (productIndex >= 0) {
          userCart.items[productIndex].quantity += quantity;
        } else {
          userCart.items.push({ productId, quantity });
        }
    
        allCarts[userCartIndex] = userCart;
      } else {
        allCarts.push({
          userId,
          items: [{ productId, quantity }],
        });
      }
    
      localStorage.setItem('allCarts', JSON.stringify(allCarts));
      state.items = allCarts.find((cart) => cart.userId === userId)?.items || [];
      state.totalQuantity = state.items.reduce((total, item) => total + item.quantity, 0);
    },
    changeQuantity(state, action) {
      const { productId, quantity, userId } = action.payload

      if (!userId) {
        console.error('No userId provided')
        return
      }

      const allCarts = JSON.parse(localStorage.getItem('allCarts')) || []
      const userCartIndex = allCarts.findIndex((cart) => cart.userId === userId)

      if (userCartIndex >= 0) {
        const userCart = allCarts[userCartIndex]
        const productIndex = userCart.items.findIndex(
          (item) => item.productId === productId
        )

        if (productIndex >= 0) {
          if (quantity <= 0) {
            userCart.items.splice(productIndex, 1)
          } else {
            userCart.items[productIndex].quantity = quantity
          }
        }

        allCarts[userCartIndex] = userCart
        localStorage.setItem('allCarts', JSON.stringify(allCarts))
        state.items = userCart.items
      }
    },
    toggleStatusTab(state) {
      state.statusTab = !state.statusTab
    },
    setQuantity(state, action) {
      state.quantity = action.payload
    },
    setTotalQuantity(state, action) {
      state.totalQuantity = action.payload
    },
    clearCart(state, action) {
      state.items= []
    },
    setSelectedUserId(state, action) {
      state.selectedUserId = action.payload
    },
    setRows(state, action) {
      state.rows = action.payload
    },
    setEditRows(state, action) {
      state.editRows = action.payload
    }
  },
})

export const {
  clearCart,
  setCartItems,
  addToCart,
  changeQuantity,
  toggleStatusTab,
  setQuantity,
  setTotalQuantity,
  initializeCart,
  setSelectedUserId,
  setRows,
} = cartSlice.actions

export default cartSlice.reducer
