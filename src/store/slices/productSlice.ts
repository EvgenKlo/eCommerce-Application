import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { type RootState } from '../store';
import { type Category, type ProductProjection } from '@commercetools/platform-sdk';
import { CategoryInternal } from '@/types/products';

const initialState = {
  categories: [] as CategoryInternal[],
  products: [] as ProductProjection[],
  product: {} as ProductProjection,
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
  const response = await passClient.getProducts();
  // await passClient.getProductsByCat();
  return response.data;
});

export const getProductsByCat = createAsyncThunk(
  'products/getProductsByCat',
  async (catId: string, thunkAPI) => {
    const state: RootState = thunkAPI.getState() as RootState;
    const passClient = state.customers.apiInstance;
    const response = await passClient.getProductsByCat(catId);
    // console.log(response);

    return response.data;
  }
);

export const getProduct = createAsyncThunk('products/getProduct', async (key: string, thunkAPI) => {
  const state: RootState = thunkAPI.getState() as RootState;
  const passClient = state.customers.apiInstance;
  const response = await passClient.getProduct(key);
  return response;
});
const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategories.fulfilled, (state, action) => {
      let categories = [] as CategoryInternal[];
      if (action.payload) categories = buildTree(action.payload);
      state.categories = categories;
    });

    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.products = action.payload ? action.payload : ([] as ProductProjection[]);
    });
    builder.addCase(getProduct.fulfilled, (state, action) => {
      state.product = action.payload ? action.payload : ({} as ProductProjection);
    });

    builder.addCase(getProductsByCat.fulfilled, (state, action) => {
      state.products = action.payload ? action.payload : ([] as ProductProjection[]);
    });
  },
});

export const selectProduct = (state: RootState) => state.products;

//convert categories array into hierarchical format
function buildTree(data: Category[]) {
  const newData: CategoryInternal[] = data.map((node) => {
    (node as CategoryInternal).children = [] as CategoryInternal[];
    return node;
  });
  const rootNodes: CategoryInternal[] = newData.filter((node) => !node.ancestors.length);

  newData.forEach((node) => {
    if (!rootNodes.includes(node)) {
      const closestParentId = node.ancestors.pop()?.id;
      const parent = rootNodes.find((root) => root.id === closestParentId);
      parent!.children?.push(node);
    }
  });
  return rootNodes;
}

export default productSlice.reducer;
