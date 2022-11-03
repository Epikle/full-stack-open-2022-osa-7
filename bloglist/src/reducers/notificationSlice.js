import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  message: '',
  isError: false,
  timer: 5000,
};

export const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setMessage: (state, action) => {
      return { ...state, ...action.payload };
    },
    clearMessage: () => initialState,
  },
});

export const { setMessage, clearMessage } = notificationSlice.actions;

export default notificationSlice.reducer;
