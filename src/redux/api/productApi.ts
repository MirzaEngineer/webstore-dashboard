import { createAsyncThunk } from '@reduxjs/toolkit';

import axiosInstance from '@/lib/auth/axiosInstance';

export const createProducts = createAsyncThunk('products/createProduct', async (formData: any, thunkAPI) => {
  try {
    const { data } = await axiosInstance.post('/api/products', formData);
    return data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const fetchProducts = createAsyncThunk('products/fetchAll', async (_, thunkAPI) => {
  try {
    const { data: result } = await axiosInstance.get('/api/products');
    return result;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const updateProduct = createAsyncThunk(
  'products/updateProduct',
  async ({ id, data }: { id: string; data: any }, thunkAPI) => {
    try {
      const { data: result } = await axiosInstance.put(`/api/products/${id}`, data);

      return result;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message || 'Failed to update product');
    }
  }
);
export const deleteProduct = createAsyncThunk(`products/deleteProduct`, async (id: string, thunkAPI) => {
  try {
    const { data: result } = await axiosInstance.delete(`/api/products/${id}`);
    return result;
  } catch (err: any) {
    const errorMessage = err?.response?.data?.message || err.message || 'Something went Wrong';
    return thunkAPI.rejectWithValue(errorMessage);
  }
});
