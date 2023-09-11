import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { type RootState } from '../store';
import {
  type CartUpdate,
  type CartDraft,
  type Cart,
  type CartAddLineItemAction,
  type CartChangeLineItemQuantityAction,
  type CartAddDiscountCodeAction,
  type DiscountCode,
} from '@commercetools/platform-sdk';
import type { PayloadAction } from '@reduxjs/toolkit';
const initialState = {
  cart: {} as Cart,
  snackbarInfo: {
    massage: '',
    errorMassage: '',
  },
  isLoading: false,
  discounts: [] as DiscountCode[],
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
export const changeProductQuantityInCart = createAsyncThunk(
  'carts/changeProductQuantityInCart',
  async ({ productId, quantity }: { productId: string; quantity: number }, thunkAPI) => {
    const state: RootState = thunkAPI.getState() as RootState;
    const client = state.customers.apiInstance;
    const { version, id } = state.carts.cart;
    const addItemAction: CartChangeLineItemQuantityAction = {
      action: 'changeLineItemQuantity',
      lineItemId: productId,
      quantity,
    };
    const cartDraft: CartUpdate = { version, actions: [addItemAction] };
    const result = await client.updateCart(id, cartDraft);
    return { result, quantity };
  }
);
export const clearCart = createAsyncThunk(
  'carts/clearCart',
  async (actions: CartChangeLineItemQuantityAction[], thunkAPI) => {
    const state: RootState = thunkAPI.getState() as RootState;
    const client = state.customers.apiInstance;
    const { version, id } = state.carts.cart;
    const cartDraft: CartUpdate = { version, actions: actions };
    const result = await client.updateCart(id, cartDraft);
    return result;
  }
);

export const getDiscountList = createAsyncThunk('carts/getDiscountList', async (_, thunkAPI) => {
  const state: RootState = thunkAPI.getState() as RootState;

  const client = state.customers.apiInstance;
  const result = await client.getDiscountCodes();
  return result;
});

export const applyDiscount = createAsyncThunk(
  'carts/applyDiscount',
  async (code: string, thunkAPI) => {
    const actions: CartAddDiscountCodeAction[] = [{ action: 'addDiscountCode', code }];
    const state: RootState = thunkAPI.getState() as RootState;
    const client = state.customers.apiInstance;
    const { version, id } = state.carts.cart;
    const cartDraft: CartUpdate = { version, actions: actions };
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
    setLoader: (state) => {
      state.isLoading = true;
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
      state.isLoading = false;
      if (action.payload.data) {
        state.cart = action.payload.data.body;
        state.snackbarInfo = { massage: 'Product added to cart', errorMassage: '' };
      } else {
        state.snackbarInfo = {
          massage: '',
          errorMassage: 'Unsuccessful attempt to change cart. Try again!',
        };
      }
    });
    builder.addCase(changeProductQuantityInCart.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.result.data) {
        state.cart = action.payload.result.data.body;
        state.snackbarInfo = {
          massage:
            action.payload.quantity > 0
              ? 'The number of items in the car has been successfully changed'
              : 'Product removed to cart',
          errorMassage: '',
        };
      } else {
        state.snackbarInfo = {
          massage: '',
          errorMassage: 'Unsuccessful attempt to change cart. Try again!',
        };
      }
    });
    builder.addCase(clearCart.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.data) {
        state.cart = action.payload.data.body;
        state.snackbarInfo = { massage: 'Cart is empty', errorMassage: '' };
      } else {
        state.snackbarInfo = {
          massage: '',
          errorMassage: 'Unsuccessful attempt to change cart. Try again!',
        };
      }
    });
    builder.addCase(getDiscountList.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.data) {
        state.discounts = action.payload.data.body.results;
      } else {
        state.snackbarInfo = {
          massage: '',
          errorMassage: 'no discounts',
        };
      }
    });
    builder.addCase(applyDiscount.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.data) {
        state.cart = action.payload.data.body;
        state.snackbarInfo = { massage: 'Discount applied', errorMassage: '' };
      } else {
        state.snackbarInfo = {
          massage: '',
          errorMassage: 'Unsuccessful attempt to change cart. Try again!',
        };
      }
    });
  },
});

export const selectCarts = (state: RootState) => state.carts;

export const { setLoader } = cartSlice.actions;

export default cartSlice.reducer;
