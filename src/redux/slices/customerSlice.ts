import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { createCustomer, deleteCustomer, fetchCustomers, updateCustomer } from '../api/customersApi';

export interface Customers {
  _id: string;
  id: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  joinedDate: string;
  image: string;
  __v: number;
}

interface CustomerState {
  customer: Customers[];
  loading: boolean;
  error: string | null;
}

const initialCustomerState: CustomerState = {
  customer: [],
  loading: false,
  error: null,
};

const customerSlice = createSlice({
  name: 'customers',
  initialState: initialCustomerState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(createCustomer.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(createCustomer.fulfilled, (state, action) => {
      state.loading = false;
      if ((action.payload as any)._id) {
        state.customer.push(action.payload as Customers);
      }
    });

    builder.addCase(createCustomer.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as string) || action.error.message || 'Failed to create customer';
    });

    builder.addCase(
      fetchCustomers.fulfilled,
      (state, action: PayloadAction<{ success: boolean; customers: Customers[] }>) => {
        state.loading = false;
        state.customer = action.payload.customers;
      }
    );

  
    builder.addCase(fetchCustomers.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as string) || action.error.message || 'Failed to load customer';
    });

    builder.addCase(updateCustomer.fulfilled, (state, action: PayloadAction<Customers>) => {
      state.loading = false;
      const index = state.customer.findIndex((p) => p._id === action.payload._id);
      if (index !== -1) {
        state.customer[index] = action.payload;
      }
    });

    builder.addCase(deleteCustomer.fulfilled, (state, action: PayloadAction<{ id: string }>) => {
      if (Array.isArray(state.customer)) {
        state.customer = state.customer.filter((customer) => customer._id !== action.payload.id);
      }
    });

    builder.addCase(deleteCustomer.rejected, (state, action) => {
      state.error = (action.payload as string) || action.error.message || 'Failed to delete Customer';
    });
  },
});

export default customerSlice.reducer;
