import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import { gStorageService } from '@/services'

const userStateKey = 'userState';

export interface UserState {
  name?: string;
  roles?: string[];
  token?: string;
  expireAt?: string;
}

export const useUserStore = defineStore('user', () => {
  const name = ref('anonymous');
  const roles = ref([] as string[]);
  const token = ref('');
  const expireAt = ref('');

  const state: UserState = gStorageService.getItem(userStateKey);

  if (state) {
    const expireAtParsed = Date.parse(state.expireAt || '');

    if (isNaN(expireAtParsed) || Date.now() > expireAtParsed) {
      gStorageService.removeItem(userStateKey);
    } else {
      state.name != null && (name.value = state.name);
      state.roles != null && (roles.value = state.roles);
      state.token != null && (token.value = state.token);
      state.expireAt != null && (expireAt.value = state.expireAt);
    }
  }

  const isAdmin = computed(() => {
    return roles.value.some(role => {
      return role === 'admin';
    });
  });

  const isSysAdmin = computed(() => {
    return roles.value.some(role => {
      return role === 'sysAdmin';
    });
  });

  const expireAtMs = computed(() => {
    return Date.parse(expireAt.value);
  })

  return {
    isAdmin,
    isSysAdmin,
    name,
    roles,
    token,
    expireAt,
    expireAtMs,
  };
})
