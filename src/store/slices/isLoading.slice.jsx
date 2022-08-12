import { createSlice } from '@reduxjs/toolkit';

export const isLoadingSlice = createSlice({
	name: 'isLoading',
	initialState: false,
	reducers: {
		setIsLoading: (state, action) => {
            const isLoading = action.payload
            return isLoading
        }
    }
})

export const getProductsThunk = () => (dispatch) => {
    dispatch(setIsLoading(true));
    return axios.get(`https://ecommerce-api-react.herokuapp.com/api/v1/products`)
    .then(res => dispatch(setProducts(res.data.data.products)))
    .finally(() => dispatch(setIsLoading(false)));
}

export const { setIsLoading } = isLoadingSlice.actions;

export default isLoadingSlice.reducer;