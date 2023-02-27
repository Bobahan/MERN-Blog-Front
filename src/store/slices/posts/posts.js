import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { postsAPI } from '../../../API/API';

export const fetchAllPosts = createAsyncThunk('posts/fetchAllPosts', async () => {
  return await postsAPI.getAllPosts();
});

export const fetchDeletePost = createAsyncThunk('posts/fetchDeletePost', async (id) => {
  return await postsAPI.deletePost(id);
});

export const fetchEditPost = createAsyncThunk('posts/fetchEdiPost', async (id) => {
  return await postsAPI.editPost(id);
});

const initialState = {
  posts: {
    items: [],
    isLoading: true,
  },
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllPosts.fulfilled, (state, action) => {
      let reversedArr = action.payload.reverse();
      state.posts.items = reversedArr;
      state.posts.isLoading = false;
    });
    builder.addCase(fetchDeletePost.fulfilled, (state, action) => {
      state.posts.items = state.posts.items.filter((post) => post._id !== action.meta.arg);
    });
  },
});

export default postsSlice.reducer;
