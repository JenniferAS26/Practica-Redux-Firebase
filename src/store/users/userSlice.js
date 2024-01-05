import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isAuthenticate: false,
    user: null,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setIsAuthenticate: (state, action) => {
      state.isAuthenticate = action.payload;
    },
    updateUser: (state, action) => {
      state.user = {
        ...state.user, ...action.payload
      }
    }
  },
});



export const { setUser, setError, setIsAuthenticate, updateUser } = userSlice.actions;

export default userSlice.reducer;
