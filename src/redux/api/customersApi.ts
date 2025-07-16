import { createAsyncThunk } from '@reduxjs/toolkit';

import axiosInstance from '@/lib/auth/axiosInstance';

export const createCustomer = createAsyncThunk('customer/createcustomers', async (formData: any, thunkAPI) => {
  try {
    const { data } = await axiosInstance.post('/api/customers', formData);
    return data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const fetchCustomers = createAsyncThunk('customer/fetchAll', async (_, thunkAPI) => {
  try {
    const { data: result } = await axiosInstance.get('/api/customers');
    return result;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || err.message);
  }
});

export const updateCustomer = createAsyncThunk(
  'customers/update',
  async ({ id, data }: { id: string; data: any }, thunkAPI) => {
    try {
      const { data: result } = await axiosInstance.put(`/api/customers/${id}`, data);

      return result;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || err.message || 'Failed to update Customer');
    }
  }
);
export const deleteCustomer = createAsyncThunk(`customer/deleteCustomer`, async (id: string, thunkAPI) => {
  try {
    const { data: result } = await axiosInstance.delete(`/api/customers/${id}`);
    return result;
  } catch (err: any) {
    const errorMessage = err?.response?.data?.message || err.message || 'Something went Wrong';
    return thunkAPI.rejectWithValue(errorMessage);
  }
});
