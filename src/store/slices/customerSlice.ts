import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { type RootState } from '../store';
import { API } from '@/api/API';
import { getApiRoot } from '@/api/lib/Client';
import {
  type CustomerDraft,
  type Customer,
  type MyCustomerChangePassword,
  type BaseAddress,
} from '@commercetools/platform-sdk';
import { type TokenStore } from '@commercetools/sdk-client-v2';
import { ClientType } from '@/types/Enums';

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
  apiInstance: new API(getApiRoot(ClientType.anonymous)),
  authorized: false,
  email: '',
  password: '',
  id: '',
  customer: {} as Customer,
  snackbarInfo: {
    massage: '',
    errorMassage: '',
  },
  isLoading: true,
};

export const createNewCustomer = createAsyncThunk(
  'customer/createNew',
  async (data: signUp, thunkAPI) => {
    const state: RootState = thunkAPI.getState() as RootState;
    const anonymousId = state.carts.cart.anonymousId;
    const { ...draft } = { ...data.data, anonymousId };
    const response = await state.customers.apiInstance.createCustomer(draft);
    if (response.data) {
      const passClient = new API(
        getApiRoot(ClientType.password, {
          email: data.data.email,
          password: data.data.password as string,
        })
      );
      await passClient.signIn({ email: data.data.email, password: data.data.password as string });
    }

    data.setLoading(false);
    return { customer: response.data?.customer, errorMassage: response.error || '' };
  }
);
export const SignIn = createAsyncThunk(
  'customer/signIn',
  async (credentials: Credentials, thunkAPI) => {
    const state: RootState = thunkAPI.getState() as RootState;
    const { email, password } = credentials;
    await state.customers.apiInstance.signInWithCartMerge(credentials);
    const passClient = new API(getApiRoot(ClientType.password, { email, password }));
    const response = await passClient.signIn(credentials);
    credentials.setLoading(false);
    return { customer: response.data?.customer, errorMassage: response.error || '' };
  }
);

export const SignInByToken = createAsyncThunk('customer/signInByToken', async (token: string) => {
  const tokenAPI = new API(getApiRoot(ClientType.token, { token }));
  const response = await tokenAPI.signInByToken();
  return response;
});

export const UpdateFirstName = createAsyncThunk(
  'customer/updateFirstName',
  async ({ firstName, version }: { firstName: string; version: number }, thunkAPI) => {
    const state: RootState = thunkAPI.getState() as RootState;
    const API = state.customers.apiInstance;
    const response = await API.setCustomerFirstName(firstName, version);
    return response;
  }
);

export const UpdateLastName = createAsyncThunk(
  'customer/updateLastName',
  async ({ lastName, version }: { lastName: string; version: number }, thunkAPI) => {
    const state: RootState = thunkAPI.getState() as RootState;
    const API = state.customers.apiInstance;
    const response = await API.setCustomerLastName(lastName, version);
    return response;
  }
);

export const UpdateEmail = createAsyncThunk(
  'customer/updateEmail',
  async ({ email, version }: { email: string; version: number }, thunkAPI) => {
    const state: RootState = thunkAPI.getState() as RootState;
    const API = state.customers.apiInstance;
    const response = await API.setCustomerEmail(email, version);
    return response;
  }
);

export const UpdateDateOfBirth = createAsyncThunk(
  'customer/updateDateOfBirth',
  async ({ date, version }: { date: string; version: number }, thunkAPI) => {
    const state: RootState = thunkAPI.getState() as RootState;
    const API = state.customers.apiInstance;
    const response = await API.setCustomerDateOfBirth(date, version);
    return response;
  }
);

export const UpdatePassword = createAsyncThunk(
  'customer/updatePassword',
  async (data: MyCustomerChangePassword, thunkAPI) => {
    const state: RootState = thunkAPI.getState() as RootState;
    const client = state.customers.apiInstance;
    const response = await client.changeCustomerPassword(data);
    if (response.data) {
      localStorage.removeItem('tokendata');
      const passClient = new API(
        getApiRoot(ClientType.password, {
          email: state.customers.customer.email,
          password: data.newPassword,
        })
      );
      await passClient.signIn({
        email: state.customers.customer.email,
        password: data.newPassword,
      });
    }
    return response;
  }
);

export const AddCustomerAddress = createAsyncThunk(
  'customer/addCustomerAddress',
  async (data: BaseAddress, thunkAPI) => {
    const state: RootState = thunkAPI.getState() as RootState;
    const client = state.customers.apiInstance;
    const response = await client.addCustomerAddress(state.customers.customer.version, data);
    return response;
  }
);

export const RemoveCustomerAddress = createAsyncThunk(
  'customer/removeCustomerAddress',
  async (id: string, thunkAPI) => {
    const state: RootState = thunkAPI.getState() as RootState;
    const client = state.customers.apiInstance;
    const response = await client.removeCustomerAddress(state.customers.customer.version, id);
    return response;
  }
);

export const UpdateCustomerAddress = createAsyncThunk(
  'customer/updateCustomerAddress',
  async ({ id, data }: { id: string; data: BaseAddress }, thunkAPI) => {
    const state: RootState = thunkAPI.getState() as RootState;
    const client = state.customers.apiInstance;
    const response = await client.updateCustomerAddress(state.customers.customer.version, id, data);
    return response;
  }
);

export const SetDefaultShippingAddress = createAsyncThunk(
  'customer/setDefaultShippingAddress',
  async (id: string, thunkAPI) => {
    const state: RootState = thunkAPI.getState() as RootState;
    const client = state.customers.apiInstance;
    const response = await client.setDefaultShippingAddress(state.customers.customer.version, id);
    return response;
  }
);

export const SetDefaultBillingAddress = createAsyncThunk(
  'customer/setDefaultBillingAddress',
  async (id: string, thunkAPI) => {
    const state: RootState = thunkAPI.getState() as RootState;
    const client = state.customers.apiInstance;
    const response = await client.setDefaultBillingAddress(state.customers.customer.version, id);
    return response;
  }
);

export const AddShippingAddressId = createAsyncThunk(
  'customer/addShippingAddressId',
  async (id: string, thunkAPI) => {
    const state: RootState = thunkAPI.getState() as RootState;
    const client = state.customers.apiInstance;
    const response = await client.addShippingAddressId(state.customers.customer.version, id);
    return response;
  }
);

export const RemoveShippingAddressId = createAsyncThunk(
  'customer/removeShippingAddressId',
  async (id: string, thunkAPI) => {
    const state: RootState = thunkAPI.getState() as RootState;
    const client = state.customers.apiInstance;
    const response = await client.removeShippingAddressId(state.customers.customer.version, id);
    return response;
  }
);

export const AddBillingAddressId = createAsyncThunk(
  'customer/addSBillingAddressId',
  async (id: string, thunkAPI) => {
    const state: RootState = thunkAPI.getState() as RootState;
    const client = state.customers.apiInstance;
    const response = await client.addBillingAddressId(state.customers.customer.version, id);
    return response;
  }
);

export const RemoveBillingAddressId = createAsyncThunk(
  'customer/removeBillingAddressId',
  async (id: string, thunkAPI) => {
    const state: RootState = thunkAPI.getState() as RootState;
    const client = state.customers.apiInstance;
    const response = await client.removeBillingAddressId(state.customers.customer.version, id);
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
      const anonClient = new API(getApiRoot(ClientType.anonymous));
      state.apiInstance = anonClient;
      state.authorized = false;
      state.customer = {} as Customer;
    },
    changeSnackbarInfo: (state, action: PayloadAction<{ name: string; message: string }>) => {
      state.snackbarInfo = {
        massage: action.payload.name || '',
        errorMassage: action.payload.message,
      };
    },
    isLoading: (state, action: PayloadAction<true | false>) => {
      state.isLoading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(createNewCustomer.fulfilled, (state, action) => {
      if (action.payload.customer) {
        state.customer = action.payload.customer;
        state.snackbarInfo = {
          massage: `Successful authorization. Hello ${action.payload.customer?.firstName || ''}`,
          errorMassage: action.payload.errorMassage,
        };
      } else {
        state.snackbarInfo = {
          massage: '',
          errorMassage: action.payload.errorMassage,
        };
      }
    });
    builder.addCase(SignIn.fulfilled, (state, action) => {
      state.customer = action.payload.customer as Customer;
      state.snackbarInfo = {
        massage: `Successful authorization. Hello ${action.payload.customer?.firstName || ''}`,
        errorMassage: action.payload.errorMassage,
      };
    });
    builder.addCase(SignInByToken.fulfilled, (state, action) => {
      state.customer = action.payload;
      state.isLoading = false;
    });
    builder.addCase(UpdateLastName.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.data) {
        state.customer = action.payload.data;
        state.snackbarInfo = {
          massage: 'Last name changed successfully!',
          errorMassage: action.payload.error,
        };
      } else {
        state.snackbarInfo = {
          massage: '',
          errorMassage: action.payload.error,
        };
      }
    });
    builder.addCase(UpdateFirstName.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.data) {
        state.customer = action.payload.data;
        state.snackbarInfo = {
          massage: 'First name changed successfully!',
          errorMassage: action.payload.error,
        };
      } else {
        state.snackbarInfo = {
          massage: '',
          errorMassage: action.payload.error,
        };
      }
    });
    builder.addCase(UpdateEmail.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.data) {
        state.customer = action.payload.data;
        state.snackbarInfo = {
          massage: 'Email changed successfully!',
          errorMassage: action.payload.error,
        };
      } else {
        state.snackbarInfo = {
          massage: '',
          errorMassage: action.payload.error,
        };
      }
    });
    builder.addCase(UpdateDateOfBirth.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.data) {
        state.customer = action.payload.data;
        state.snackbarInfo = {
          massage: 'Date of birth changed successfully!',
          errorMassage: action.payload.error,
        };
      } else {
        state.snackbarInfo = {
          massage: '',
          errorMassage: action.payload.error,
        };
      }
    });
    builder.addCase(UpdatePassword.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.data) {
        const token = JSON.parse(localStorage.getItem('tokendata')!) as TokenStore;
        state.customer = action.payload.data;
        state.apiInstance = new API(getApiRoot(ClientType.token, { token: token.refreshToken }));
        state.snackbarInfo = {
          massage: 'Password changed successfully!',
          errorMassage: action.payload.error,
        };
      } else {
        state.snackbarInfo = {
          massage: '',
          errorMassage: action.payload.error,
        };
      }
    });
    builder.addCase(AddCustomerAddress.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.data) {
        state.customer = action.payload.data;
        state.snackbarInfo = {
          massage: 'Address added successfully!',
          errorMassage: action.payload.error,
        };
      } else {
        state.snackbarInfo = {
          massage: '',
          errorMassage: action.payload.error,
        };
      }
    });
    builder.addCase(RemoveCustomerAddress.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.data) {
        state.customer = action.payload.data;
        state.snackbarInfo = {
          massage: 'Address successfully deleted!',
          errorMassage: action.payload.error,
        };
      } else {
        state.snackbarInfo = {
          massage: '',
          errorMassage: action.payload.error,
        };
      }
    });
    builder.addCase(UpdateCustomerAddress.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.data) {
        state.customer = action.payload.data;
        state.snackbarInfo = {
          massage: 'Address parameters changed successfully!',
          errorMassage: action.payload.error,
        };
      } else {
        state.snackbarInfo = {
          massage: '',
          errorMassage: action.payload.error,
        };
      }
    });
    builder.addCase(SetDefaultShippingAddress.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.data) {
        state.customer = action.payload.data;
        state.snackbarInfo = {
          massage: 'Address parameters changed successfully!',
          errorMassage: action.payload.error,
        };
      } else {
        state.snackbarInfo = {
          massage: '',
          errorMassage: action.payload.error,
        };
      }
    });
    builder.addCase(SetDefaultBillingAddress.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.data) {
        state.customer = action.payload.data;
        state.snackbarInfo = {
          massage: 'Address parameters changed successfully!',
          errorMassage: action.payload.error,
        };
      } else {
        state.snackbarInfo = {
          massage: '',
          errorMassage: action.payload.error,
        };
      }
    });
    builder.addCase(AddShippingAddressId.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.data) {
        state.customer = action.payload.data;
        state.snackbarInfo = {
          massage: 'Address parameters changed successfully!',
          errorMassage: action.payload.error,
        };
      } else {
        state.snackbarInfo = {
          massage: '',
          errorMassage: action.payload.error,
        };
      }
    });
    builder.addCase(RemoveShippingAddressId.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.data) {
        state.customer = action.payload.data;
        state.snackbarInfo = {
          massage: 'Address parameters changed successfully!',
          errorMassage: action.payload.error,
        };
      } else {
        state.snackbarInfo = {
          massage: '',
          errorMassage: action.payload.error,
        };
      }
    });
    builder.addCase(AddBillingAddressId.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.data) {
        state.customer = action.payload.data;
        state.snackbarInfo = {
          massage: 'Address parameters changed successfully!',
          errorMassage: action.payload.error,
        };
      } else {
        state.snackbarInfo = {
          massage: '',
          errorMassage: action.payload.error,
        };
      }
    });
    builder.addCase(RemoveBillingAddressId.fulfilled, (state, action) => {
      state.isLoading = false;
      if (action.payload.data) {
        state.customer = action.payload.data;
        state.snackbarInfo = {
          massage: 'Address parameters changed successfully!',
          errorMassage: action.payload.error,
        };
      } else {
        state.snackbarInfo = {
          massage: '',
          errorMassage: action.payload.error,
        };
      }
    });
  },
});

export const selectCustomer = (state: RootState) => state.customers;

export const { createCustomer, setAuthorization, setApi, signOut, changeSnackbarInfo, isLoading } =
  customerSlice.actions;

export default customerSlice.reducer;
