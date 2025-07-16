'use client';

import { combineReducers } from '@reduxjs/toolkit';

import customersReducer from './slices/customerSlice';
import productReducer from './slices/productSlice';
import authReducer from './slices/userSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  products: productReducer,
  customers: customersReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
