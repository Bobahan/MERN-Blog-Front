import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './slices/posts/posts';
import authReducer from './slices/auth/auth';

export const store = configureStore({
  reducer: {
    posts: postsReducer,
    auth: authReducer,
  },
});
