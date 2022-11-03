import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    initBlogs: (state, action) => {
      return [...action.payload];
    },
    addBlog: (state, action) => {
      return state.concat(action.payload);
    },
    addLike: (state, action) => {
      const index = state.map((blog) => blog.id).indexOf(action.payload);
      state[index].likes++;
      return state;
    },
    removeBlog: (state, action) => {
      return state.filter((blog) => blog.id !== action.payload);
    },
    addComment: (state, action) => {
      const index = state.map((blog) => blog.id).indexOf(action.payload.id);
      state[index].comments = state[index].comments.concat(
        action.payload.comment,
      );
      return state;
    },
  },
});

export const { initBlogs, addBlog, addLike, removeBlog, addComment } =
  blogSlice.actions;

export default blogSlice.reducer;
