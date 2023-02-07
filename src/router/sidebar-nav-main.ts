import type { NavigationItem } from '@/model/bo';


export const mainNavItemsFull: NavigationItem[] = [
  {
    icon: 'House',
    title: 'Home',
    index: '/main/home',
  },
  {
    icon: 'Setting',
    title: 'System Management',
    index: '/main/sys-management',
    needRoles: [
      'admin',
    ],
    children: [
      {
        title: 'User Management',
        index: '/main/sys-management/user-management',
      },
    ],
  },
];
