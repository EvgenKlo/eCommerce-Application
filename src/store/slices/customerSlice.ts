import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { API } from '@/api/API';
import { getApiRoot } from '@/api/lib/Client';
import { type Customer } from '@commercetools/platform-sdk';

export interface ICredentials {
  email: string;
  password: string;
}

export interface createCustomer extends ICredentials {
  id?: string;
}
const initialState = {
  apiInstance: new API(getApiRoot('anonimous')),
  authorized: false,
  email: '',
  password: '',
  id: '',
  customer: {} as Customer,
};

export const createNewCustomer = createAsyncThunk(
  'customer/createNew',
  async (data: createCustomer, thunkAPI) => {
    const state: RootState = thunkAPI.getState() as RootState;
    const response = await state.customers.apiInstance.createCustomer(data);
    return response;
  }
);
export const SignIn = createAsyncThunk('customer/signIn', async (credentials: ICredentials) => {
  const { email, password } = credentials;
  const passClient = new API(getApiRoot('password', { email, password }));
  const response = await passClient.signIn(credentials);
  return response;
});
export const SignInByToken = createAsyncThunk('customer/signInByToken', async (token: string) => {
  const tokenAPI = new API(getApiRoot('token', { token }));
  const response = await tokenAPI.signInByToken();
  return response;
});

const customerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {
    createCustomer: (state, action: PayloadAction<createCustomer>) => {
      state.email = action.payload.email;
      state.password = action.payload.password;
    },
    setAuthorization: (state, action: PayloadAction<true | false>) => {
      state.authorized = action.payload;
    },
    setApi: (state, action: PayloadAction<API>) => {
      state.apiInstance = action.payload;
    },
    signOut: (state) => {
      const anonClient = new API(getApiRoot('anonimous'));
      state.apiInstance = anonClient;
      localStorage.removeItem('tokendata');
      state.authorized = false;
      state.customer = {} as Customer;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createNewCustomer.fulfilled, (state, action) => {
      state.customer = action.payload.customer;
    });
    builder.addCase(SignIn.fulfilled, (state, action) => {
      state.customer = action.payload.customer;
    });
    builder.addCase(SignInByToken.fulfilled, (state, action) => {
      state.customer = action.payload;
    });
  },
});

export const selectCustomer = (state: RootState) => state.customers;

export const { createCustomer, setAuthorization, setApi, signOut } = customerSlice.actions;

export default customerSlice.reducer;
