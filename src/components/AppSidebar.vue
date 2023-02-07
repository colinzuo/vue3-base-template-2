<template>
  <div class="sidebar">
    <div v-if="!sidebar.collapse" class="sidebar-title">
      {{  title }}
    </div>
    <el-menu
        class="sidebar-el-menu"
        :default-active="onRoutes"
        :collapse="sidebar.collapse"
        unique-opened
        router
    >
        <template v-for="item in navItems">
            <template v-if="item.children">
                <el-sub-menu :index="item.index" :key="item.index">
                    <template #title>
                        <el-icon v-if="item.icon">
                            <component :is="item.icon"></component>
                        </el-icon>
                        <span>{{ item.title }}</span>
                    </template>
                    <template v-for="subItem in item.children">
                        <el-sub-menu
                            v-if="subItem.children"
                            :index="subItem.index"
                            :key="`${subItem.index}-if`"
                        >
                            <template #title>{{ subItem.title }}</template>
                            <el-menu-item v-for="threeItem in subItem.children" :key="threeItem.index" :index="threeItem.index">
                                {{ threeItem.title }}
                            </el-menu-item>
                        </el-sub-menu>
                        <el-menu-item v-else :index="subItem.index" :key="`${subItem.index}-else`">
                            {{ subItem.title }}
                        </el-menu-item>
                    </template>
                </el-sub-menu>
            </template>
            <template v-else>
                <el-menu-item :index="item.index" :key="item.index">
                    <el-icon v-if="item.icon">
                        <component :is="item.icon"></component>
                    </el-icon>
                    <template #title>{{ item.title }}</template>
                </el-menu-item>
            </template>
        </template>
    </el-menu>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';

import { useSidebarStore } from '@/stores/sidebar';
import type { NavigationItem } from '@/model/bo';

import { defaultSettings } from '@/settings';

defineProps({
  navItems: {
    type: Array<NavigationItem>,
    required: true,
  },
})

const route = useRoute();
const onRoutes = computed(() => {
  return route.path;
});

const sidebar = useSidebarStore();

const title = defaultSettings.title;
</script>

<style scoped>
.sidebar {
  --el-menu-item-height: 40px;
  height: 100%;
  overflow-y: scroll;
  border-right: 1px solid var(--color-border);
}
.sidebar-title {
  height: 64px;
  display: flex;
  align-items: center;
  padding: 10px;
  font-weight: bold;
  border-bottom: 1px solid var(--color-border);
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 250px;
}
.sidebar > ul {
  height: 100%;
}
</style>
