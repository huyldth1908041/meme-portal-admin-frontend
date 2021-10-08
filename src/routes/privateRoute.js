import { Dashboard } from '../pages/Dashboard';

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
};

export default privateRoute;