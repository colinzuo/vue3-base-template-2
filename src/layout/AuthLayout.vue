<template>
  <div class="full-wh">
    <el-container>
      <el-header>
        <span>{{ title }}</span>

        <el-button
          v-if="showSignin"
          @click="onClickSignin"
        >
          Signin
        </el-button>

        <el-button
          v-if="showSignup"
          class="ml-2"
          @click="onClickSignup"
        >
          Signup
        </el-button>
      </el-header>

      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { useRouter, useRoute } from 'vue-router';

import { defaultSettings } from '@/settings';
import { computed } from 'vue';

const title = defaultSettings.title;

const router = useRouter();
const route = useRoute();

const showSignin = computed(() => {
  return route.name !== 'login' ? true : false;
});

const showSignup = computed(() => {
  return route.name !== 'signup' ? true : false;
});

function onClickSignin() {
  router.push({name: "login"});
}

function onClickSignup() {
  router.push({name: "signup"});
}
</script>
