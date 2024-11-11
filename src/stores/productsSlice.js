import { createSlice } from "@reduxjs/toolkit";
import ProductsApi from "../modules/api/ProductsApi";
const initialState = {
    products:[],
    selectProduct:null,
}

const productsSlice = createSlice ({
    name:"products",
    initialState,
    reducers:{
        setProducts(state,action){
            console.log("Productos recibidos:", action.payload);
            state.products= action.payload
        },
        setSelectProduct(state,action){
            state.selectProduct = action.payload
        },
        clearSelectProduct(state){
            state.selectProduct = null
        }
    }
})
const productsApi = ProductsApi();
export const fetchProducts = () => async (dispatch) => {
    try {
        const data = await productsApi.getProducts(); 
        if (Array.isArray(data) && data.length > 0) {
            dispatch(setProducts(data)); 
        } else {
            console.error("No se obtuvieron productos válidos.");
        }
    } catch (error) {
        console.error("Error al obtener productos:", error);
    }
};

export const { setProducts,setSelectProduct,clearSelectProduct } = productsSlice.actions;
export default productsSlice.reducer;