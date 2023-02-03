import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import { gStorageService } from '@/services'

const userStateKey = 'userState';

export interface UserState {
  name?: string;
  roles?: string[];
  token?: string;
  expireAt?: number;
}

export const useUserStore = defineStore('user', () => {
  const name = ref('anonymous');
  const roles = ref([] as string[]);
  const token = ref('');
  const expireAt = ref(-1);

  const state: UserState = gStorageService.getItem(userStateKey);

  if (state) {
    if (state.expireAt == null || Date.now() > state.expireAt) {
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

  return {
    isAdmin,
    isSysAdmin,
    name,
    roles,
    token,
    expireAt,
  };
})
