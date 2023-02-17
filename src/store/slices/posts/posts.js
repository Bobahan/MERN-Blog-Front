import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { postsAPI } from '../../../API/API';

export const fetchAllPosts = createAsyncThunk('posts/fetchAllPosts', async () => {
  return await postsAPI.getAllPosts();
});

const initialState = {
  posts: {
    items: [],
    isLoading: 'loading',
  },
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllPosts.fulfilled, (state, action) => {
      state.posts.items = action.payload;
      state.posts.isLoading = 'loaded';
    });
  },
});

export default postsSlice.reducer;
