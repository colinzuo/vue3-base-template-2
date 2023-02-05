import type { RouteLocationNormalized } from 'vue-router';

import { useUserStore } from '@/stores/user';

export function hasRole(targetRole: string): boolean {
  const userStore = useUserStore();

  const has = userStore.roles.some(role => {
    return role === targetRole;
  });

  return has;
}

export function hasOneOfRole(roleList: string[]): boolean {
  if (roleList && roleList instanceof Array && roleList.length > 0) {
    const userStore = useUserStore();

    const hasOneOf = userStore.roles.some(role => {
      return roleList.includes(role);
    });

    return hasOneOf;
  } else {
    throw new Error('hasOneOfRole: invalid input');
  }
}

export function hasRoutePermission(route: RouteLocationNormalized): boolean {
  for (const record of route.matched) {
    if (!record.meta.needRoles) {
      continue;
    }

    if (!hasOneOfRole(record.meta.needRoles)) {
      return false;
    }
  }

  return true;
}

