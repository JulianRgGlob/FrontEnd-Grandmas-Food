import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  passwords: '',
  email: '',
  showPassword: false,
  errors: {
    errorEmail: '',
    errorPasword: '',
  },
  errorMessage: '',
  nickName: '',
  hashPassword: '',
  user:null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setEmail(state, action) {
      state.email = action.payload
    },
    setPassword(state, action) {
      state.passwords = action.payload
    },
    setShowPassword(state) {
      state.showPassword = !state.showPassword
    },
    setErrors(state, action) {
      state.errors = action.payload
    },
    setErrorMessage(state, action) {
      state.errorMessage = action.payload
    },
    clearErrors(state) {
      state.errors = { email: '', password: '' }
      state.errorMessage = ''
    },
    setNickName(state, action) {
      state.nickName = action.payload
    },
    setHashPassword(state, action) {
      state.hashPassword = action.payload
    },
    setUser(state, action) {
      state.user = action.payload
    },
    clearUser(state) {
      state.user = null
    },
  },
})

export const {
  setEmail,
  setPassword,
  setShowPassword,
  setErrors,
  setErrorMessage,
  clearErrors,
  setNickName,
  setHashPassword,
  setUser,
  clearUser,
} = authSlice.actions
export default authSlice.reducer
