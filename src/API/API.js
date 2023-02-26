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
  addPost: async (post) => {
    return await instance.post(`/post`, post);
  },
  deletePost: async (id) => {
    return await instance.delete(`/post/${id}`).then((res) => {
      return res.data;
    });
  },
  editPost: async (id, post) => {
    return await instance.patch(`/post/${id}`, post).then((res) => {
      return res.data;
    });
  },
};

export const authAPI = {
  login: async (data) => {
    try {
      return await instance.post('/auth/login', data).then((res) => {
        return res.data;
      });
    } catch (error) {
      const { response } = error;
      if (response.status === 400) {
        return response.data.message;
      }
    }
  },
  getMe: async () => {
    return await instance.get('/auth/me').then((res) => {
      return res.data;
    });
  },
  register: async (data) => {
    try {
      return await instance.post('/auth/register', data).then((res) => {
        return res.data;
      });
    } catch (error) {
      const { response } = error;
      if (response.status === 500) {
        return response.data.message;
      } else {
        return response.data.message;
      }
    }
  },
};

export const uploadAPI = {
  uploadIMG: async (img) => {
    let formData = new FormData();
    formData.append('image', img);
    return await instance.post('/upload', formData);
  },
};
