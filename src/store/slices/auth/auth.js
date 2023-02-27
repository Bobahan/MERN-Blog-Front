import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { authAPI } from '../../../API/API';

export const fetchAuth = createAsyncThunk('auth/fetchAuth', async (data) => {
  return await authAPI.login(data);
});

export const fetchAuthMe = createAsyncThunk('auth/fetchAuthMe', async () => {
  return await authAPI.getMe();
});

export const fetchRegister = createAsyncThunk('auth/fetchRegister', async (data) => {
  return await authAPI.register(data);
});

const initialState = {
  user: null,
  isLoading: 'loading',
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAuth.fulfilled, (state, action) => {
      if (typeof action.payload === 'string') {
        state.user = null;
        state.isLoading = 'loaded';
      } else {
        state.user = action.payload;
        state.isLoading = 'loaded';
      }
    });
    builder.addCase(fetchAuthMe.fulfilled, (state, action) => {
      state.user = action.payload;
      state.isLoading = 'loaded';
    });
    builder.addCase(fetchRegister.fulfilled, (state, action) => {
      state.user = action.payload;
      if (typeof action.payload === 'string') {
        state.user = null;
        state.isLoading = 'loaded';
      } else {
        state.user = action.payload;
        state.isLoading = 'loaded';
      }
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
