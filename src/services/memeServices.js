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
};

export default memeServices;