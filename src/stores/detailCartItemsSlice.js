import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  detail: {},
  openAlert: false,
}

const detailCartItemsSlice = createSlice({
  name: 'detail',
  initialState,

  reducers: {
    setDetail(state, action) {
      const productId = action.payload.productUuid
      state.detail[productId] = action.payload 
    },
    setOpenAlert(state, action) {
      state.openAlert = action.payload
    }
  },
})

export const { setDetail , setOpenAlert } = detailCartItemsSlice.actions
export default detailCartItemsSlice.reducer
