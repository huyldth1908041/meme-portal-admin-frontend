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
  fetchLikedList: async (id, params = {}) => {
    const url = `/posts/${id}/like`;
    return await axiosClient.get(url, { params });
  },
  fetchCommentList: async (id, params = {}) => {
    const url = `/posts/${id}/comments`;
    return await axiosClient.get(url, { params });
  },
  listReports: async (params = {}) => {
    const url = `/reports`;
    return await axiosClient.get(url, { params });
  },
  resolveReports: async (body) => {
    const url = '/reports/resolve';
    return await axiosClient.post(url, body);
  },
  deleteReport: async (id) => {
    const url = `/reports/${id}`;
    return await axiosClient.delete(url);
  },
  searchAdvertisements: async (params = {}) => {
    const url = '/advertisements';
    return await axiosClient.get(url, { params });
  },
  verifyAdvertisements: async (body) => {
    const url = '/advertisements/verify';
    return await axiosClient.post(url, body);
  },
  advertisementDetail: async (id) => {
    const url = `/advertisements/${id}`;
    return await axiosClient.get(url);
  },
  getShowingAdvertisement: async () => {
    const url = `/advertisements/active`;
    return await axiosClient.get(url);
  },
  deleteAdvertisement: async (id) => {
    const url = `/advertisements/${id}`;
    return await axiosClient.delete(url);
  },
};

export default memeServices;