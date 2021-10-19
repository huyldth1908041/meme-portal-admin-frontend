import { Dashboard } from '../pages/Dashboard';
import { CreatePost, EditPost, ListPost, PostDetail, VerifyPost } from '../pages/PostManagement';
import { EditProfilePage, ListUsersPage, RegisterUserPage, UserDetailPage } from '../pages/UserManagement';

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
  registerUser: {
    path: '/user/create',
    component: RegisterUserPage,
    requiredLogin: true,
  },
  listUsers: {
    path: '/user/all',
    component: ListUsersPage,
    requiredLogin: true,
  },
  editUser: {
    path: '/user/edit/:id',
    url: (id) => `/user/edit/${id}`,
    component: EditProfilePage,
    requiredLogin: true,
  },
  userDetail: {
    path: '/user/:id',
    url: (id) => `/user/${id}`,
    component: UserDetailPage,
    requiredLogin: true,
  },
};

export default privateRoute;