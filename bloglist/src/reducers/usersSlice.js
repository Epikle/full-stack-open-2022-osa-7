import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    initUsers: (state, action) => action.payload,
  },
});

export const { initUsers } = usersSlice.actions;

export default usersSlice.reducer;
