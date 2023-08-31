import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { type RootState } from '../store';
import { API } from '@/api/API';
import { getApiRoot } from '@/api/lib/Client';
import {
  type CustomerDraft,
  type Customer,
  type MyCustomerChangePassword,
} from '@commercetools/platform-sdk';

export interface Credentials {
  email: string;
  password: string;
  setLoading: (val: boolean) => void;
}
interface signUp {
  data: CustomerDraft;
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
  snackbarInfo: {
    name: '',
    errorMassage: '',
  },
};

export const createNewCustomer = createAsyncThunk(
  'customer/createNew',
  async (data: signUp, thunkAPI) => {
    const state: RootState = thunkAPI.getState() as RootState;
    const response = await state.customers.apiInstance.createCustomer(data.data);
    const passClient = new API(
      getApiRoot('password', { email: data.data.email, password: data.data.password as string })
    );
    await passClient.signIn({ email: data.data.email, password: data.data.password as string });
    data.setLoading(false);
    return { customer: response.data?.customer, errorMassage: response.error || '' };
  }
);
export const SignIn = createAsyncThunk('customer/signIn', async (credentials: Credentials) => {
  const { email, password } = credentials;
  const passClient = new API(getApiRoot('password', { email, password }));
  const response = await passClient.signIn(credentials);
  credentials.setLoading(false);
  return { customer: response.data?.customer, errorMassage: response.error || '' };
});

export const SignInByToken = createAsyncThunk('customer/signInByToken', async (token: string) => {
  const tokenAPI = new API(getApiRoot('token', { token }));
  const response = await tokenAPI.signInByToken();
  return response;
});

export const UpdateFirstName = createAsyncThunk(
  'customer/updateFirstName',
  async (
    { id, firstName, version }: { id: string; firstName: string; version: number },
    thunkAPI
  ) => {
    const state: RootState = thunkAPI.getState() as RootState;
    const API = state.customers.apiInstance;
    const response = await API.setCustomerFirstName(id, firstName, version);
    return response;
  }
);

export const UpdateLastName = createAsyncThunk(
  'customer/updateLastName',
  async (
    { id, lastName, version }: { id: string; lastName: string; version: number },
    thunkAPI
  ) => {
    const state: RootState = thunkAPI.getState() as RootState;
    const API = state.customers.apiInstance;
    const response = await API.setCustomerLastName(id, lastName, version);
    return response;
  }
);

export const UpdateEmail = createAsyncThunk(
  'customer/updateEmail',
  async ({ id, email, version }: { id: string; email: string; version: number }, thunkAPI) => {
    const state: RootState = thunkAPI.getState() as RootState;
    const API = state.customers.apiInstance;
    const response = await API.setCustomerEmail(id, email, version);
    return response;
  }
);

export const UpdateDateOfBirth = createAsyncThunk(
  'customer/updateDateOfBirth',
  async ({ id, date, version }: { id: string; date: string; version: number }, thunkAPI) => {
    const state: RootState = thunkAPI.getState() as RootState;
    const API = state.customers.apiInstance;
    const response = await API.setCustomerDateOfBirth(id, date, version);
    return response;
  }
);

export const UpdatePassword = createAsyncThunk(
  'customer/updatePassword',
  async (data: MyCustomerChangePassword, thunkAPI) => {
    const state: RootState = thunkAPI.getState() as RootState;
    const API = state.customers.apiInstance;
    const response = await API.changeCustomerPassword(data);
    return response;
  }
);

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
      state.customer = action.payload.customer as Customer;
      state.snackbarInfo = {
        name: action.payload.customer?.firstName || '',
        errorMassage: action.payload.errorMassage,
      };
    });
    builder.addCase(SignIn.fulfilled, (state, action) => {
      state.customer = action.payload.customer as Customer;
      state.snackbarInfo = {
        name: action.payload.customer?.firstName || '',
        errorMassage: action.payload.errorMassage,
      };
    });
    builder.addCase(SignInByToken.fulfilled, (state, action) => {
      state.customer = action.payload;
    });
    builder.addCase(UpdateLastName.fulfilled, (state, action) => {
      state.customer = action.payload as Customer;
    });
    builder.addCase(UpdateFirstName.fulfilled, (state, action) => {
      state.customer = action.payload as Customer;
    });
    builder.addCase(UpdateEmail.fulfilled, (state, action) => {
      state.customer = action.payload as Customer;
    });
    builder.addCase(UpdateDateOfBirth.fulfilled, (state, action) => {
      state.customer = action.payload as Customer;
    });
    builder.addCase(UpdatePassword.fulfilled, (state, action) => {
      state.customer = action.payload as Customer;
    });
  },
});

export const selectCustomer = (state: RootState) => state.customers;

export const { createCustomer, setAuthorization, setApi, signOut } = customerSlice.actions;

export default customerSlice.reducer;
