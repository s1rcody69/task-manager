import { createSlice } from '@reduxjs/toolkit';

// Load initial auth state from localStorage
const loadAuthState = () => {
  try {
    const serializedState = localStorage.getItem('authState');
    if (serializedState === null) {
      return {
        isAuthenticated: false,
        user: null,
      };
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return {
      isAuthenticated: false,
      user: null,
    };
  }
};

// Save auth state to localStorage
const saveAuthState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('authState', serializedState);
  } catch (err) {
    console.error('Could not save auth state', err);
  }
};

const initialState = loadAuthState();

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      saveAuthState(state);
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      saveAuthState(state);
    },
    register: (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      saveAuthState(state);
    },
  },
});

export const { login, logout, register } = authSlice.actions;
export default authSlice.reducer;

// Selectors with memoization
export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;
export const selectCurrentUser = (state) => state.auth.user;