import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { setIsLoading } from './isLoading.slice';
import getConfig from '../../utils/getConfig';

export const cartSlice = createSlice({
	name: 'cart',
	initialState: [],
	reducers: {
        setCart: (state, action) => {
            const cart = action.payload;
		    return cart
        } 
    }
    
})

export const getCartThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/cart`, getConfig())
    .then(res => dispatch(setCart(res.data.data.cart.products)))
    .finally(() => dispatch(setIsLoading(false)));
}

export const getAddCartThunk = purchase => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.post(`https://ecommerce-api-react.herokuapp.com/api/v1/cart`, purchase, getConfig())
    .then(() => dispatch(getCartThunk()))
    .finally(() => dispatch(setIsLoading(false)));
}

export const buyCartThunk = purchase => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.post(`https://ecommerce-api-react.herokuapp.com/api/v1/purchases`, {}, getConfig())
    .then(() => dispatch(setCart([])))
    .finally(() => dispatch(setIsLoading(false)));
}

export const { setCart } = cartSlice.actions;

export default cartSlice.reducer;