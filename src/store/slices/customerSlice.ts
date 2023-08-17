import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { API } from '@/api/API';
import { getApiRoot } from '@/api/lib/Client';
import { type CustomerDraft, type Customer } from '@commercetools/platform-sdk';

export interface Credentials {
  email: string;
  password: string;
  setOpen: (val: string) => void;
  setLoading: (val: boolean) => void;
}
interface signUp {
  data: CustomerDraft;
  setOpen: (val: string) => void;
  setLoading: (val: boolean) => void;
}

export interface createCustomer extends Credentials {
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
  async (data: signUp, thunkAPI) => {
    const state: RootState = thunkAPI.getState() as RootState;
    const response = await state.customers.apiInstance.createCustomer(data.data);
    if (response.error) data.setOpen(response.error);
    else {
      const passClient = new API(
        getApiRoot('password', { email: data.data.email, password: data.data.password as string })
      );
      await passClient.signIn({ email: data.data.email, password: data.data.password as string });
    }
    data.setLoading(false);
    return response.data?.customer;
  }
);
export const SignIn = createAsyncThunk('customer/signIn', async (credentials: Credentials) => {
  const { email, password } = credentials;
  const passClient = new API(getApiRoot('password', { email, password }));
  const response = await passClient.signIn(credentials);
  if (response.error) credentials.setOpen(response.error);
  credentials.setLoading(false);
  return response.data?.customer;
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
      state.customer = action.payload as Customer;
    });
    builder.addCase(SignIn.fulfilled, (state, action) => {
      state.customer = action.payload as Customer;
    });
    builder.addCase(SignInByToken.fulfilled, (state, action) => {
      state.customer = action.payload;
    });
  },
});

export const selectCustomer = (state: RootState) => state.customers;

export const { createCustomer, setAuthorization, setApi, signOut } = customerSlice.actions;

export default customerSlice.reducer;