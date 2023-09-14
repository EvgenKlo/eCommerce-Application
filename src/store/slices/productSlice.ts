import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { type RootState } from '../store';
import {
  type ProductProjection,
  type FacetResults,
  type TermFacetResult,
  type Category,
} from '@commercetools/platform-sdk';
import { CategoryInternal, InitialState } from '@/types/products';
import { buildQueryFilter } from '@/helpers/buildQueryFilter';
import { buildTree } from '@/helpers/buildTree';
import { SortOptions } from '@/types/Enums';

const initialState: InitialState = {
  categories: [],
  categoriesNotTransfromed: [],
  products: [],
  product: {} as ProductProjection,
  filters: { price: { operand: 'range', lower: 0, upper: 100 } },
  colors: [],
  size: [],
  gender: [],
  manufacturer: [],
  maxPrice: 100,
  isLoading: false,
  sort: {
    direction: 'asc',
    prop: SortOptions.price,
  },
  search: '',
  total: 0,
  limit: 12,
  currentPage: 1,
  count: 0,
  digits: 2,
};

export const getCategories = createAsyncThunk('products/getCategories', async (_, thunkAPI) => {
  const state: RootState = thunkAPI.getState() as RootState;
  const passClient = state.customers.apiInstance;
  const response = await passClient.getCategories();
  return response.data;
});

export const getProducts = createAsyncThunk('products/getProducts', async (_, thunkAPI) => {
  thunkAPI.dispatch(setLoading(true));
  const state: RootState = thunkAPI.getState() as RootState;
  const passClient = state.customers.apiInstance;
  const response = await passClient.getProducts();
  return response.data;
});

export const getProductsByCat = createAsyncThunk(
  'products/getProductsByCat',
  async (catId: string, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true));
    const state: RootState = thunkAPI.getState() as RootState;
    const passClient = state.customers.apiInstance;
    const response = await passClient.getProductsByCat(catId);
    return response.data;
  }
);
export const getProductsWithFilter = createAsyncThunk(
  'products/getProductsWithFilter',
  async (_, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true));
    const state: RootState = thunkAPI.getState() as RootState;
    const passClient = state.customers.apiInstance;
    const filter = buildQueryFilter(state.products.filters);
    const sort = `${state.products.sort.prop} ${state.products.sort.direction}`;
    const search = state.products.search;
    const limit = state.products.limit;
    const offset = (state.products.currentPage - 1) * limit;
    const response = await passClient.getProductsWithFilter(filter, sort, search, limit, offset);
    return response;
  }
);
export const getProductsbySearch = createAsyncThunk(
  'products/getProductsbySearch',
  async (searchStr: string, thunkAPI) => {
    thunkAPI.dispatch(setLoading(true));
    const state: RootState = thunkAPI.getState() as RootState;
    const passClient = state.customers.apiInstance;
    const response = await passClient.getProductsBySearch(searchStr);
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
    deriveAttributes: (state, action: PayloadAction<{ facets: FacetResults }>) => {
      const colors: string[] = [];
      const size: string[] = [];
      const gender: string[] = [];
      const manufacturer: string[] = [];
      const prices: number[] = [];
      Object.keys(action.payload.facets).forEach((facet: string): void => {
        const facetData = action.payload.facets[facet] as TermFacetResult;
        if (facetData.terms.length) {
          facetData.terms.forEach(({ term }: { term: string; count: number }) => {
            switch (facet) {
              case 'variants.attributes.color.en':
                !!term && colors.push(term);
                break;
              case 'variants.attributes.size.en':
                !!term && size.push(term);
                break;
              case 'variants.attributes.gender.en':
                !!term && gender.push(term);
                break;
              case 'variants.attributes.designer.en':
                !!term && manufacturer.push(term);
                break;
              case 'variants.price.centAmount':
                {
                  !!term && prices.push(Number(term));
                }
                break;
            }
          });
        }
      });

      state.colors = colors;
      state.size = size;
      state.gender = gender;
      state.manufacturer = manufacturer;
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
      state.filters.gender = action.payload.genders;
    },
    setCategory: (state, action: PayloadAction<{ categoryId: string }>) => {
      state.filters.catId = action.payload.categoryId;
    },
    resetFilter: (state) => {
      const newFilterState = { ...initialState.filters };
      newFilterState.price = { ...initialState.filters.price };
      newFilterState.price.upper = state.maxPrice;
      state.filters = newFilterState;
      state.currentPage = 1;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setSortingOptions: (state, action: PayloadAction<typeof state.sort>) => {
      state.sort = action.payload;
    },
    setSearch: (state, action: PayloadAction<typeof state.search>) => {
      state.search = action.payload;
    },
    setTotal: (state, action: PayloadAction<{ total: number }>) => {
      state.total = action.payload.total;
    },
    setCount: (state, action: PayloadAction<{ count: number }>) => {
      state.count = action.payload.count;
    },
    setLimit: (state, action: PayloadAction<{ limit: number }>) => {
      state.limit = action.payload.limit;
    },
    setCurrentPage: (state, action: PayloadAction<{ page: number }>) => {
      state.currentPage = action.payload.page;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCategories.fulfilled, (state, action) => {
      let categories = [] as CategoryInternal[];
      if (action.payload) categories = buildTree(action.payload);
      state.categories = categories;
      state.categoriesNotTransfromed = action.payload as Category[];
    });

    builder.addCase(getProducts.fulfilled, (state, action) => {
      if (action.payload) {
        productSlice.caseReducers.deriveAttributes(state, {
          payload: {
            facets: action.payload?.facets,
          },
          type: 'products/filters',
        });

        state.digits = action.payload.results[0].masterVariant.prices
          ? action.payload.results[0].masterVariant.prices[0].value.fractionDigits
          : 2;
      }
    });
    builder.addCase(getProduct.fulfilled, (state, action) => {
      state.product = action.payload.data ? action.payload.data : ({} as ProductProjection);
      productSlice.caseReducers.setLoading(state, { payload: false, type: 'products/isLoading' });
    });

    builder.addCase(getProductsByCat.fulfilled, (state, action) => {
      state.products = action.payload ? action.payload : ([] as ProductProjection[]);
      productSlice.caseReducers.setLoading(state, { payload: false, type: 'products/isLoading' });
    });
    builder.addCase(getProductsWithFilter.fulfilled, (state, action) => {
      state.products = action.payload.data?.body.results
        ? action.payload.data?.body.results
        : ([] as ProductProjection[]);

      productSlice.caseReducers.setTotal(state, {
        payload: { total: action.payload.data?.body.total as number },
        type: 'products/total',
      });
      productSlice.caseReducers.setLoading(state, { payload: false, type: 'products/isLoading' });
    });
    builder.addCase(getProductsbySearch.fulfilled, (state, action) => {
      state.products = action.payload ? action.payload : ([] as ProductProjection[]);
      productSlice.caseReducers.setLoading(state, { payload: false, type: 'products/isLoading' });
    });
  },
});

export const selectProduct = (state: RootState) => state.products;

export const {
  setPrice,
  deriveAttributes: setAvailColors,
  setFilterColors,
  setFilterManufacturer,
  setFilterSize,
  setFilterGender,
  resetFilter,
  setCategory,
  setLoading,
  setSortingOptions,
  setSearch,
  setLimit,
  setCurrentPage,
} = productSlice.actions;

export default productSlice.reducer;
