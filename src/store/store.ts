import { configureStore } from '@reduxjs/toolkit';
import CustomerReducer from './slices/customerSlice';
import ProductReducer from './slices/productSlice';
import CartReducer from './slices/cartSlice';

export const store = configureStore({
  reducer: {
    customers: CustomerReducer,
    products: ProductReducer,
    carts: CartReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    });
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
