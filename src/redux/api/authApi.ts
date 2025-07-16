'use client';

import { createAsyncThunk } from '@reduxjs/toolkit';

import axiosInstance from '@/lib/auth/axiosInstance';
import { resetValues } from '@/components/auth/reset-passoword';
import { Values } from '@/components/auth/sign-in-form';

export const registerUser = createAsyncThunk('users/register', async (updatedValues: any, thunkAPI) => {
  try {
    const { data: result } = await axiosInstance.post('/api/auth/register', updatedValues);
    return result;
  } catch (err: any) {
    const errorMessage = err?.response?.data?.message || err.message || 'Something went wrong';
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

export const loginUser = createAsyncThunk('users/login', async (credentials: Values, thunkAPI) => {
  try {
    const { data: result } = await axiosInstance.post('/api/auth/login', credentials);
    return result;
  } catch (err: any) {
    const errorMessage = err?.response?.data?.message || err.message || 'Something went wrong';
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

export const otpverification = createAsyncThunk('users/otp', async (otp: string, thunkAPI) => {
  try {
    const { data: result } = await axiosInstance.post(
      '/api/auth/otpverification',
      { otp },
      {
        withCredentials: true,
      }
    );
    return result;
  } catch (err: any) {
    const errorMessage = err?.response?.data?.message || err.message || 'Something went wrong';
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

export const resetPassword = createAsyncThunk('users/reset', async (values: resetValues, thunkAPI) => {
  try {
    const { data: result } = await axiosInstance.post('/api/auth/otpverification', values);
    return result;
  } catch (err: any) {
    const errorMessage = err?.response?.data?.message || err.message || 'Something went wrong';
    return thunkAPI.rejectWithValue(errorMessage);
  }
});

export const logoutUser = createAsyncThunk('users/logout', async (_, thunkAPI) => {
  try {
    const { data } = await axiosInstance.get('/api/auth/logout', {
      withCredentials: true,
    });
    return data;
  } catch (err: any) {
    const errorMessage = err?.response?.data?.message || err.message || 'Logout failed';
    return thunkAPI.rejectWithValue(errorMessage);
  }
});
