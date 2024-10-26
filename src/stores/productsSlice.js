import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products:[],
}

const productsSlice = createSlice ({
    name:"products",
    initialState,
    reducers:{
        setProducts(state,action){
            console.log("Productos recibidos:", action.payload);
            return state.action.payload
        }
    }
})
export const { setProducts } = productsSlice.actions;
export default productsSlice.reducer;