import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../store';
import { API } from '@/api/API';

export interface createCustomer {
  email: string;
  password: string;
}
const initialState: createCustomer = {
  email: 'johnDoe@example.com',
  password: 'qwerty12345',
};

export const createNewCustomer = createAsyncThunk(
  'customer/createNew',
  async (data: createCustomer) => {
    const response = await API.createCustomer(data);
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
  },
  extraReducers: (builder) => {
    builder.addCase(createNewCustomer.fulfilled, (state, action) => {
      console.log(state, action);
    });
  },
});

export const selectCustomer = (state: RootState) => state.customers;

export const { createCustomer } = customerSlice.actions;

export default customerSlice.reducer;
