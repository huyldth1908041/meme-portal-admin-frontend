import { Dashboard } from '../pages/Dashboard';
import { CreatePost, EditPost, ListPost, PostDetail, VerifyPost } from '../pages/PostManagement';

const privateRoute = {
  home: {
    path: '/',
    component: Dashboard,
    requiredLogin: true,
  },
  dashboard: {
    path: '/dashboard',
    component: Dashboard,
    requiredLogin: true,
  },
  verifyPost: {
    path: '/post/verify',
    component: VerifyPost,
    requiredLogin: true,
  },
  createPost: {
    path: '/post/create',
    component: CreatePost,
    requiredLogin: true,
  },
  listPosts: {
    path: '/post/all',
    component: ListPost,
    requiredLogin: true,
  },

  postDetail: {
    path: '/post/:id',
    url: (id) => `/post/${id}`,
    component: PostDetail,
    requiredLogin: true,
  },
  editPost: {
    path: '/post/edit/:id',
    url: (id) => `/post/edit/${id}`,
    component: EditPost,
    requiredLogin: true,
  },
};

export default privateRoute;