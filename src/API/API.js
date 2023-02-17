import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:4444/api',
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem('token');
  return config;
});

export const postsAPI = {
  getAllPosts: async () => {
    return await instance.get('/post').then((res) => {
      return res.data;
    });
  },
  getOnePost: async (id) => {
    return await instance.get(`/post/${id}`);
  },
};

export const authAPI = {
  login: async (data) => {
    return await instance.post('/auth/login', data).then((res) => {
      return res.data;
    });
  },
  getMe: async () => {
    return await instance.get('/auth/me').then((res) => {
      return res.data;
    });
  },
  register: async (data) => {
    return await instance.post('/auth/register', data).then((res) => {
      return res.data;
    });
  },
};
