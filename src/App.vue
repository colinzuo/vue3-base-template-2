<script setup lang="ts">
import { RouterView } from 'vue-router'

import { useUserStore } from '@/stores/user';

import { gMockServerUserService } from './mock-server/services';

const userStore = useUserStore();

if (userStore.token) {
  gMockServerUserService.loadUserByName(userStore.name);
}
</script>

<template>
  <RouterView />
</template>
