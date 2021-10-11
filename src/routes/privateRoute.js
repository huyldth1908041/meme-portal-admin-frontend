import { Dashboard } from '../pages/Dashboard';
import { CreatePost, VerifyPost } from '../pages/PostManagement';

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
    component: Dashboard,
    requiredLogin: true,
  },
};

export default privateRoute;