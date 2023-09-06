import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { type RootState } from '../store';
import {
  type CartUpdate,
  type CartDraft,
  type Cart,
  type CartAddLineItemAction,
} from '@commercetools/platform-sdk';

const initialState = {
  cart: {} as Cart,
};

export const getActiveCart = createAsyncThunk('carts/getActiveCart', async (_, thunkAPI) => {
  const state: RootState = thunkAPI.getState() as RootState;
  const client = state.customers.apiInstance;
  const result = await client.getActiveCart();
  if (!result.data) {
    await thunkAPI.dispatch(createCart());
  } else {
    await thunkAPI.dispatch(addProductToCart());
  }
  return result;
});
export const createCart = createAsyncThunk('carts/createCart', async (_, thunkAPI) => {
  const state: RootState = thunkAPI.getState() as RootState;
  const client = state.customers.apiInstance;
  const cartDraft: CartDraft = { currency: 'EUR' };
  const result = await client.createCart(cartDraft);
  return result;
});
export const addProductToCart = createAsyncThunk('carts/addProduct', async (_, thunkAPI) => {
  const state: RootState = thunkAPI.getState() as RootState;
  const client = state.customers.apiInstance;
  const { version, id } = state.carts.cart;
  const addItemAction: CartAddLineItemAction = {
    action: 'addLineItem',
    productId: 'e811f8ff-8769-4275-964d-527c6b819d12',
    quantity: 1,
  };
  const cartDraft: CartUpdate = { version, actions: [addItemAction] };
  const result = await client.updateCart(id, cartDraft);
  return result;
});

const cartSlice = createSlice({
  name: 'carts',
  initialState,
  reducers: {
    // getCart: (state, action: PayloadAction<{ page: number }>) => {
    //   // state.currentPage = action.payload.page;
    // },
  },
  extraReducers: (builder) => {
    builder.addCase(getActiveCart.fulfilled, (state, action) => {
      // state.isLoading = false;
      if (action.payload.data) {
        state.cart = action.payload.data.body;
      } else {
        // state.snackbarInfo = {
        //   massage: '',
        //   errorMassage: action.payload.error,
        // };
      }
    });
  },
});

export const selectCarts = (state: RootState) => state.carts;

// export const {} = cartSlice.actions;

export default cartSlice.reducer;
