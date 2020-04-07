import BasicLayout from '@/layouts/BasicLayout';

export const nodes = [
  {
    path: '/',
    redirect: {
      path: '/webgl',
    },
  },
  {
    path: '/webgl',
    component: BasicLayout,
    redirect: {
      path: '/webgl/color_circle',
    },
    children: [
      {
        path: '/webgl/color_circle',
        component: () => import('@/views/webgl/colorCircle'),
      },
    ],
  },
];
