'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { loginUser, logoutUser, otpverification, registerUser, resetPassword } from '../api/authApi';

interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  accountVerified: boolean;
  phone: string;
}

interface AuthResponse {
  user: User;
  token: string;
  message?: string;
  success?: boolean;
}

interface UserState {
  currentUser: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  currentUser: null,
  token: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearAuthState: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(otpverification.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(resetPassword.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    // Register User cases
    builder.addCase(registerUser.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
      state.loading = false;
      state.currentUser = action.payload.user;
      state.token = action.payload.token;
    });

    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as string) || action.error.message || 'Registration failed';
    });

    // Login User cases
    builder.addCase(loginUser.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
      state.loading = false;
      state.currentUser = action.payload.user;
      state.token = action.payload.token;
    });

    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as string) || action.error.message || 'Login failed';
    });

    // otpVerification Cases
    builder
      .addCase(otpverification.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.loading = false;
        state.currentUser = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(otpverification.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error.message || 'otpVerification Failed';
      });

    // resetPassowrd Cases
    builder
      .addCase(resetPassword.fulfilled, (state, action: PayloadAction<AuthResponse>) => {
        state.loading = false;
        state.currentUser = action.payload.user;
        state.token = action.payload.token;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || action.error.message || 'token Invalid';
      });
    // logout  Cases
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.currentUser = null;
      state.token = null;
      state.loading = false;
      state.error = null;
    });

    builder.addCase(logoutUser.rejected, (state, action) => {
      state.loading = false;
      state.error = (action.payload as string) || action.error.message || 'Logout failed';
    });
  },
});

export const { clearAuthState } = authSlice.actions;
export default authSlice.reducer;
