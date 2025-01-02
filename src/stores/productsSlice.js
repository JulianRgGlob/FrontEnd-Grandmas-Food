import { createSlice, current } from '@reduxjs/toolkit'
import ProductsApi from '../modules/api/ProductsApi'
const initialState = {
  products: [],
  currentProduct: null,
}

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts(state, action) {
      state.products = action.payload
    },
    addProduct: (state, action) => {
      state.products.push(action.payload)
    },
    updateProduct: (state, action) => {
      const index = state.products.findIndex(
        (product) => product.productUuid === action.payload.productUuid
      )
      if (index !== -1) {
        state.products[index] = action.payload
      }
    },
    deleteProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product.productUuid !== action.payload
      )
    },
    setCurrentProduct: (state, action) => {
      state.currentProduct = action.payload
    },
    clearCurrentProduct: (state) => {
      state.currentProduct = null
    },
  },
})
const productsApi = ProductsApi()
export const fetchProducts = () => async (dispatch) => {
  try {
    const data = await productsApi.getProducts()
    if (Array.isArray(data) && data.length > 0) {
      dispatch(setProducts(data))
    } else {
      console.error('No se obtuvieron productos válidos.')
    }
  } catch (error) {
    console.error('Error al obtener productos:', error)
  }
}

export const {
  setProducts,
  setSelectProduct,
  clearSelectProduct,
  updateProduct,
  deleteProduct,
  addProduct,
  setCurrentProduct,
  clearCurrentProduct,
} = productsSlice.actions
export default productsSlice.reducer
