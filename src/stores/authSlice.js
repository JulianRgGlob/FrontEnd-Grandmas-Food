import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  passwords: "",
  email: "",
  showPassword: false,
  errors: {
    errorEmail: "",
    errorPasword: "",
  },
  errorMessage: "",
  nickName:"",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setEmail(state, action) {
      state.email = action.payload;
    },
    setPassword(state, action) {
      state.passwords = action.payload;
    },
    setShowPassword(state) {
      state.showPassword = !state.showPassword;
    },
    setErrors(state, action) {
      state.errors = action.payload;
    },
    setErrorMessage(state, action) {
      state.errorMessage = action.payload;
    },
    clearErrors(state) {
      state.errors = { email: "", password: "" };
      state.errorMessage = "";
    },
    setNickName(state,action){
      state.nickName = action.payload
    }
  },
});

export const {setEmail,setPassword,setShowPassword,setErrors,setErrorMessage,clearErrors,setNickName} = authSlice.actions
export default authSlice.reducer