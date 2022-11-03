import { configureStore } from '@reduxjs/toolkit';

import blogReducer from './blogSlice';
import notificationReducer from './notificationSlice';
import userReducer from './userSlice';
import usersReducer from './usersSlice';

export const store = configureStore({
  reducer: {
    blog: blogReducer,
    notification: notificationReducer,
    user: userReducer,
    users: usersReducer,
  },
});
