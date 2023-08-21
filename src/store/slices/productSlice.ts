import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { type RootState } from '../store';
import { type Product, type Category } from '@commercetools/platform-sdk';

const initialState = {
  categories: [] as Category[],
  products: [] as Product[],
};

export const getCategories = createAsyncThunk('products/getCategories', async (_, thunkAPI) => {
  const state: RootState = thunkAPI.getState() as RootState;
  const passClient = state.customers.apiInstance;
  const response = await passClient.getCategories();
  return response.data;
});

export const getProducts = createAsyncThunk('products/getProducts', async (_, thunkAPI) => {
  const state: RootState = thunkAPI.getState() as RootState;
  const passClient = state.customers.apiInstance;
  try {
    const response = await passClient.getProducts();
    return response;
  } catch (error) {
    console.log(error);
  }
});

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategories.fulfilled, (state, action) => {
      state.categories = action.payload ? action.payload : ([] as Category[]);
    });
    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.products = action.payload ? action.payload : ([] as Product[]);
    });
  },
});

export const selectProduct = (state: RootState) => state.products;

// export const { createCustomer, setAuthorization, setApi, signOut } = productSlice.actions;

export default productSlice.reducer;
