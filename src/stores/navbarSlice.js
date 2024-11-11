import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  anchorElNav: null,
  anchorElUser: null,
}

const navbarSlice = createSlice({
  name: 'navbar',
  initialState,

  reducers: {
    setAnchorElNav(state, action) {
      state.anchorElNav = action.payload
    },
    setAnchorElUser(state, action) {
      state.anchorElUser = action.payload
    },
  },
})

export const { setAnchorElNav, setAnchorElUser } = navbarSlice.actions
export default navbarSlice.reducer
