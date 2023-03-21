import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
  name: 'auth',
  initialState: {
    isAuthenticated: false,
    authToken: '',
  },
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.authToken = action.payload;
      localStorage.setItem('authToken', action.payload); // Save the authentication token to local storage
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.authToken = '';
      localStorage.removeItem('authToken'); // Remove the authentication token from local storage
    },
  },
});

export const { login, logout } = authSlice.actions;

export const authReducer = authSlice.reducer;
