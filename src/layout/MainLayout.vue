<template>
  <div class="main-container">
    <AppSidebar
      :class="{collapse: sidebarStore.collapse, expand: !sidebarStore.collapse}"
      :nav-items="mainNavItemsActive">
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
import AppHeader from '@/components/AppHeader.vue';
import AppSidebar from '@/components/AppSidebar.vue';

import { mainNavItemsFull } from '@/router';
import { useSidebarStore } from '@/stores/sidebar';
import { NavigationUtils } from '@/utils';


const sidebarStore = useSidebarStore();

const mainNavItemsActive = NavigationUtils.processNavigationItems(mainNavItemsFull);
</script>

<style lang="scss" scoped>
.main-container {
  display: flex;
  height: 100%;

  .expand {
    width: 250px;
  }

  .collapse {
    width: 64px;
  }

  .main-right {
    flex-grow: 1;
    display: flex;
    flex-direction: column;

    .main-content {
      flex-grow: 1;
      width: calc(100% - 1px);
    }
  }
}
</style>
