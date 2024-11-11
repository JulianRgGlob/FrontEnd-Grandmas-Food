import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  detail: {},
}

const detailCartItemsSlice = createSlice({
  name: 'detail',
  initialState,

  reducers: {
    setDetail(state, action) {
      const productId = action.payload.productUuid
      state.detail[productId] = action.payload 
    },
  },
})

export const { setDetail } = detailCartItemsSlice.actions
export default detailCartItemsSlice.reducer
