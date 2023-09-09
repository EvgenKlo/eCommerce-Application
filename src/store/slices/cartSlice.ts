import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { type RootState } from '../store';
import {
  type CartUpdate,
  type CartDraft,
  type Cart,
  type CartAddLineItemAction,
} from '@commercetools/platform-sdk';
import type { PayloadAction } from '@reduxjs/toolkit';
const initialState = {
  cart: {} as Cart,
};

export const getActiveCart = createAsyncThunk('carts/getActiveCart', async (_, thunkAPI) => {
  const state: RootState = thunkAPI.getState() as RootState;
  const client = state.customers.apiInstance;
  const result = await client.getActiveCart();
  if (!result.data) {
    thunkAPI.rejectWithValue('no cart');
  } else {
    return result;
  }
});
export const createCart = createAsyncThunk('carts/createCart', async (_, thunkAPI) => {
  const state: RootState = thunkAPI.getState() as RootState;
  const client = state.customers.apiInstance;
  const cartDraft: CartDraft = { currency: 'EUR' };
  const result = await client.createCart(cartDraft);
  return result;
});
export const addProductToCart = createAsyncThunk(
  'carts/addProductToCart',
  async (productId: string, thunkAPI) => {
    const state: RootState = thunkAPI.getState() as RootState;
    const client = state.customers.apiInstance;
    const { version, id } = state.carts.cart;
    const addItemAction: CartAddLineItemAction = {
      action: 'addLineItem',
      productId,
      quantity: 1,
    };
    const cartDraft: CartUpdate = { version, actions: [addItemAction] };
    const result = await client.updateCart(id, cartDraft);
    return result;
  }
);

const cartSlice = createSlice({
  name: 'carts',
  initialState,
  reducers: {
    setCart: (state, action: PayloadAction<{ cart: Cart }>) => {
      state.cart = action.payload.cart;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getActiveCart.fulfilled, (state, action) => {
      if (action.payload) {
        state.cart = action.payload.data.body;
      }
    });
    builder.addCase(createCart.fulfilled, (state, action) => {
      if (action.payload.data) {
        state.cart = action.payload.data.body;
      }
    });
    builder.addCase(addProductToCart.fulfilled, (state, action) => {
      if (action.payload.data) {
        state.cart = action.payload.data.body;
      }
    });
  },
});

export const selectCarts = (state: RootState) => state.carts;

export default cartSlice.reducer;
