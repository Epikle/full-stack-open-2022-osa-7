import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: '',
  name: '',
  token: '',
  isLoggedIn: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      localStorage.setItem('FSO_osa4_user', JSON.stringify(action.payload));
      return { isLoggedIn: true, ...action.payload };
    },
    logout: () => {
      localStorage.removeItem('FSO_osa4_user');
      return initialState;
    },
  },
});

export const { setUser, logout } = userSlice.actions;

export default userSlice.reducer;
