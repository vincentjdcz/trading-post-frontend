// Inside your Redux slice
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: JSON.parse(localStorage.getItem('isLoggedIn')) || false,
    userId: localStorage.getItem('userId') || null,
  };
  
  const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
      loginSuccess(state, action) {
        state.isLoggedIn = true;
        state.userId = action.payload.userId;
        localStorage.setItem('userId', action.payload.userId); // Persist userId
        localStorage.setItem('isLoggedIn', true); // Persist isLoggedIn
      },
      logout(state) {
        state.isLoggedIn = false;
        state.userId = null;
        localStorage.removeItem('userId'); // Clear userId
        localStorage.removeItem('isLoggedIn'); // Clear isLoggedIn
      },
    },
  });
  
  export const { loginSuccess, logout } = authSlice.actions;
  export default authSlice.reducer;
  