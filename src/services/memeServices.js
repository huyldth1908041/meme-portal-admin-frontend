import axiosClient from './axiosClient';

const memeServices = {
  login: async (body) => {
    const url = '/login';
    return await axiosClient.post(url, body);
  },
  searchMemes: async (params = {}) => {
    const url = '/posts';
    return await axiosClient.get(url, { params });
  },
  verifyPosts: async (body) => {
    const url = '/posts/verify';
    return await axiosClient.post(url, body);
  },

  deletePosts: async (body) => {
    const url = '/posts';
    return await axiosClient.delete(url, body);
  },
  getCategories: async () => {
    const url = '/categories';
    return await axiosClient.get(url);
  },
  createPost: async (body) => {
    const url = '/posts';
    return await axiosClient.post(url, body);
  },
  updatePost: async (id, body) => {
    const url = `/posts/${id}`;
    return await axiosClient.put(url, body);
  },
  postDetail: async (id) => {
    const url = `/posts/${id}`;
    return await axiosClient.get(url);
  },

  searchUsers: async (params = {}) => {
    const url = `/users`;
    return await axiosClient.get(url, { params });
  },
  registerUser: async (body) => {
    const url = '/register';
    return await axiosClient.post(url, body);
  },

  userDetail: async (id) => {
    const url = `/users/${id}`;
    return await axiosClient.get(url);
  },
  deactiveUser: async (id) => {
    const url = `/users/${id}`;
    return await axiosClient.delete(url);
  },
  updateProfile: async (id, body) => {
    const url = `/users/${id}`;
    return await axiosClient.put(url, body);
  },
};

export default memeServices;