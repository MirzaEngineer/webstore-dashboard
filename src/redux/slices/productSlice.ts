import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { createProducts, deleteProduct, fetchProducts, updateProduct } from '../api/productApi';

export interface Product {
  _id: string;
  title: string;
  description: string;
  updatedAt: string;
  price: string;
  image: string;
  __v: number;
}

interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
}

const initialProductState: ProductState = {
  products: [],
  loading: false,
  error: null,
};

const productSlice = createSlice({
  name: 'products',
  initialState: initialProductState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(createProducts.fulfilled, (state, action) => {
      state.loading = false;
      if ((action.payload as any)._id) {
        state.products.push(action.payload as Product);
      }
    });

    builder.addCase(createProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as string) || action.error.message || 'Failed to create product';
    });

    builder.addCase(
      fetchProducts.fulfilled,
      (state, action: PayloadAction<{ success: boolean; products: Product[] }>) => {
        state.loading = false;
        state.products = action.payload.products;
      }
    );

    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as string) || action.error.message || 'Failed to load products';
    });

    builder.addCase(updateProduct.fulfilled, (state, action: PayloadAction<Product>) => {
      state.loading = false;
      if (Array.isArray(state.products)) {
        const index = state.products.findIndex((p) => p._id === action.payload._id);
        if (index !== -1) {
          state.products = [...state.products.slice(0, index), action.payload, ...state.products.slice(index + 1)];
        }
      }
    });
    builder.addCase(deleteProduct.fulfilled, (state, action: PayloadAction<{ id: string }>) => {
      if (Array.isArray(state.products)) {
        state.products = state.products.filter((product) => product._id !== action.payload.id);
      }
    });

    builder.addCase(deleteProduct.rejected, (state, action) => {
      state.error = (action.payload as string) || action.error.message || 'Failed to delete product';
    });
  },
});

export default productSlice.reducer;
