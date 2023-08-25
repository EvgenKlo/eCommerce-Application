import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { type RootState } from '../store';
import { type Category, type ProductProjection, type Attribute } from '@commercetools/platform-sdk';
import { CategoryInternal, FilterProducts } from '@/types/products';

const initialState = {
  categories: [] as CategoryInternal[],
  products: [] as ProductProjection[],
  product: {} as ProductProjection,
  filters: { price: { operand: '=', lower: 0, upper: 100 } } as FilterProducts,
  colors: [] as string[],
  size: [] as string[],
  gender: [] as string[],
  manufacturer: [] as string[],
  maxPrice: 0,
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
  return response.data;
});

export const getProductsByCat = createAsyncThunk(
  'products/getProductsByCat',
  async (catId: string, thunkAPI) => {
    const state: RootState = thunkAPI.getState() as RootState;
    const passClient = state.customers.apiInstance;
    const response = await passClient.getProductsByCat(catId);
    console.log(buildQueryFilter(state.products.filters));

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
  reducers: {
    deriveAttributes: (state) => {
      const colors: string[] = [];
      const size: string[] = [];
      const gender: string[] = [];
      const manufacturer: string[] = [];
      const prices: number[] = [];
      (state.products as ProductProjection[]).forEach((product: ProductProjection): void => {
        const attr: Attribute[] | undefined = product?.masterVariant?.attributes;
        if (attr) {
          attr.forEach(({ name, value }: { name: string; value: string }) => {
            switch (name) {
              case 'color':
                !!value && colors.push(value);
                break;
              case 'size':
                !!value && size.push(value);
                break;
              case 'gender':
                !!value && gender.push(value);
                break;
              case 'designer':
                !!value && manufacturer.push(value);
                break;
            }
          });
        }
        if (product?.masterVariant.prices)
          prices.push(product?.masterVariant.prices[0]!.value.centAmount);
      });

      const unicColorList = new Set(colors.map((elem) => Object.values(elem)[0]));
      const unicSizes = new Set(size.map((elem) => Object.values(elem)[0]));
      const unicGender = new Set(gender.map((elem) => Object.values(elem)[0]));
      const unicManufacturer = new Set(manufacturer.map((elem) => Object.values(elem)[0]));

      state.colors = [...unicColorList.values()];
      state.size = [...unicSizes.values()];
      state.gender = [...unicGender.values()];
      state.manufacturer = [...unicManufacturer.values()];

      const maxPrice = Math.max(...prices);
      state.maxPrice = maxPrice;
      state.filters.price.upper = maxPrice;
    },
    setPrice: (state, action: PayloadAction<{ range: number[]; operand: string }>) => {
      const [lower, upper] = action.payload.range;
      const { operand } = action.payload;
      state.filters.price = { lower, upper, operand };
    },

    setFilterColors: (state, action: PayloadAction<{ colors: string[] }>) => {
      state.filters.colors = action.payload.colors;
    },
    setFilterManufacturer: (state, action: PayloadAction<{ manufacturers: string[] }>) => {
      state.filters.manufacturer = action.payload.manufacturers;
    },
    setFilterSize: (state, action: PayloadAction<{ sizes: string[] }>) => {
      state.filters.size = action.payload.sizes;
    },
    setFilterGender: (state, action: PayloadAction<{ genders: string[] }>) => {
      state.filters.size = action.payload.genders;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCategories.fulfilled, (state, action) => {
      let categories = [] as CategoryInternal[];
      if (action.payload) categories = buildTree(action.payload);
      state.categories = categories;
    });

    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.products = action.payload ? action.payload : ([] as ProductProjection[]);
      productSlice.caseReducers.deriveAttributes(state);
    });
    builder.addCase(getProduct.fulfilled, (state, action) => {
      state.product = action.payload ? action.payload : ({} as ProductProjection);
    });

    builder.addCase(getProductsByCat.fulfilled, (state, action) => {
      state.products = action.payload ? action.payload : ([] as ProductProjection[]);
      productSlice.caseReducers.deriveAttributes(state);
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

function buildQueryFilter(filter: FilterProducts): string[] {
  const keys = Object.keys(filter);
  const queryFilter = keys.reduce((query, key) => {
    let option = '';
    switch (key) {
      case 'category':
        option = `categories.id:subtree("${filter[key]}")`;
        break;
      case 'price':
        if (filter[key].upper && filter[key].operand == 'range') {
          option = `variants.price.centAmount:range ("${filter[key].lower}" to "${filter[key].upper}")`;
        } else if (filter[key].operand == '=') {
          option = `variants.price.centAmount:"${filter[key].lower}"`;
        }
        break;
      case 'colors': {
        // option = `variants.attributes.color:"${filter[key]}"`;
        break;
      }
    }
    query.push(option);
    return query;
  }, [] as string[]);
  return queryFilter;
}

export const {
  setPrice,
  deriveAttributes: setAvailColors,
  setFilterColors,
  setFilterManufacturer,
  setFilterSize,
  setFilterGender,
} = productSlice.actions;

export default productSlice.reducer;
