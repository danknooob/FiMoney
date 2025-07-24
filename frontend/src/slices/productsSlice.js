import { createSlice } from '@reduxjs/toolkit';

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    loading: false,
    error: null,
    page: 1,
    hasMore: true,
  },
  reducers: {
    setProducts: (state, action) => {
      state.items = action.payload.products;
      state.hasMore = action.payload.hasMore;
      state.loading = false;
      state.error = null;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
});

export const { setProducts, setLoading, setError, setPage } = productsSlice.actions;
export default productsSlice.reducer; 