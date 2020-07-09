import BasicLayout from '@/layouts/BasicLayout';
import LoginLayout from '@/layouts/LoginLayout';

export const nodes = [
  {
    path: '/',
    component: LoginLayout,
    redirect: {
      path: '/login',
    },
    children: [
      {
        path: '/login',
        label: '登录',
        component: () => import('@/views/login'),
      },
    ],
  },
  {
    path: '/webgl',
    label: 'WebGL',
    component: BasicLayout,
    redirect: {
      path: '/webgl/color_circle',
    },
    children: [
      {
        path: '/webgl/color_circle',
        label: '彩环',
        component: () => import('@/views/webgl/colorCircle'),
      },
    ],
  },
];
