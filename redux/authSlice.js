// Inside your Redux slice
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLoggedIn: JSON.parse(localStorage.getItem('isLoggedIn')) || false,
    userId: localStorage.getItem('userId') || null,
    userName: localStorage.getItem('userName') || null,
    profilePicture: localStorage.getItem('profilePicture') || ""
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
        localStorage.setItem('userName', action.payload.userName);
        localStorage.setItem('profilePicture', action.payload.profilePicture);
      },
      logout(state) {
        state.isLoggedIn = false;
        state.userId = null;
        state.profilePicture = null;
        localStorage.removeItem('userId'); // Clear userId
        localStorage.removeItem('isLoggedIn'); // Clear isLoggedIn
        localStorage.removeItem('profilePicture');
      },
      uploadProfilePictureSuccess(state, action) {
        state.profilePicture = action.payload.profilePicture;
        localStorage.setItem('profilePicture', action.payload.profilePicture);
      }
    },
  });
  
  export const { loginSuccess, logout, uploadProfilePictureSuccess } = authSlice.actions;
  export default authSlice.reducer;
  