import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { type RootState } from '../store';
import {
  type Category,
  type ProductProjection,
  type FacetResults,
  type TermFacetResult,
} from '@commercetools/platform-sdk';
import { CategoryInternal, FilterProducts } from '@/types/products';

const initialState = {
  categories: [] as CategoryInternal[],
  products: [] as ProductProjection[],
  product: {} as ProductProjection,
  filters: { price: { operand: 'range', lower: 0, upper: 100 } } as FilterProducts,
  colors: [] as string[],
  size: [] as string[],
  gender: [] as string[],
  manufacturer: [] as string[],
  maxPrice: 100,
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
    // console.log('Query Filter', buildQueryFilter(state.products.filters));

    return response.data;
  }
);
export const getProductsWithFilter = createAsyncThunk(
  'products/getProductsWithFilter',
  async (_, thunkAPI) => {
    const state: RootState = thunkAPI.getState() as RootState;
    const passClient = state.customers.apiInstance;
    const filter = buildQueryFilter(state.products.filters);
    const response = await passClient.getProductsWithFilter(filter);
    // console.log('Query Filter', buildQueryFilter(state.products.filters));
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
      state.filters = initialState.filters;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getCategories.fulfilled, (state, action) => {
      let categories = [] as CategoryInternal[];
      if (action.payload) categories = buildTree(action.payload);
      state.categories = categories;
    });

    builder.addCase(getProducts.fulfilled, (state, action) => {
      state.products = action.payload?.results
        ? action.payload.results
        : ([] as ProductProjection[]);
      productSlice.caseReducers.deriveAttributes(state, {
        payload: {
          facets: action.payload?.facets as FacetResults,
        },
        type: 'products/filters',
      });
    });
    builder.addCase(getProduct.fulfilled, (state, action) => {
      state.product = action.payload ? action.payload : ({} as ProductProjection);
    });

    builder.addCase(getProductsByCat.fulfilled, (state, action) => {
      state.products = action.payload ? action.payload : ([] as ProductProjection[]);
      // productSlice.caseReducers.deriveAttributes(state);
    });
    builder.addCase(getProductsWithFilter.fulfilled, (state, action) => {
      state.products = action.payload ? action.payload : ([] as ProductProjection[]);
      // productSlice.caseReducers.deriveAttributes(state);
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
      case 'price':
        if (filter[key].upper && filter[key].upper) {
          option = `variants.price.centAmount:range ("${filter[key].lower}" to "${filter[key].upper}")`;
        }
        break;
      case 'colors': {
        if (filter[key]?.length)
          option = `variants.attributes.color.en:"${filter[key]?.join('","')}"`;
        break;
      }
      case 'size': {
        if (filter[key]?.length)
          option = `variants.attributes.size.en:"${filter[key]?.join('","')}"`;
        break;
      }
      case 'gender': {
        if (filter[key]?.length)
          option = `variants.attributes.gender.en:"${filter[key]?.join('","')}"`;
        break;
      }
      case 'manufacturer': {
        if (filter[key]?.length)
          option = `variants.attributes.designer.en:"${filter[key]?.join('","')}"`;
        break;
      }
      case 'catId': {
        option = `categories.id:subtree("${filter[key]}")`;
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
  resetFilter,
  setCategory,
} = productSlice.actions;

export default productSlice.reducer;
