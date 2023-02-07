<template>
  <div class="main-container">
    <AppSidebar :nav-items="mainNavItemsActive">
    </AppSidebar>
    <div class="main-right">
      <AppHeader>
      </AppHeader>
      <div class="main-content">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

import { defaultSettings } from '@/settings';

import { mainNavItemsFull } from '@/router';
import { useUserStore } from '@/stores/user';
import { useSidebarStore } from '@/stores/sidebar';

import type { NavigationItem } from '@/model/bo';

import { NavigationUtils } from '@/utils';

import AppSidebar from '@/components/AppSidebar.vue';
import AppHeader from '@/components/AppHeader.vue';

const title = defaultSettings.title;
const sidebar = ref(true);

const userStore = useUserStore();

const mainNavItemsActive = NavigationUtils.processNavigationItems(mainNavItemsFull);

</script>

<style lang="scss" scoped>
.main-container {
  display: flex;
  height: 100%;
  // align-items: center;
  // border-bottom: 1px solid var(--color-border);

  .main-right {
    flex-grow: 1;
  }

  .main-content {

  }
}
</style>
