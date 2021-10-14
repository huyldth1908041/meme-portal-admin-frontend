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
};

export default memeServices;