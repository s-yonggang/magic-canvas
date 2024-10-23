<template>
  <a-layout style="min-height: 100vh; width: 100vw">
    <!-- 侧边栏 -->
    <a-layout-sider v-model:collapsed="collapsed" collapsible>
      <div class="logo" />
      <a-menu v-model:selectedKeys="selectedKeys" theme="dark" mode="inline">
        <a-menu-item v-for="item in routes" :key="item.path" @click="onSikp(item.path)">
          <DesktopOutlined />
          <span>{{ item.name }}</span>
          <!-- {{ item.meta.icon }} -->
        </a-menu-item>
      </a-menu>
    </a-layout-sider>

    <a-layout :style="{ background: '#fff' }">
      <!-- 头部 -->
      <!-- <a-layout-header style="background: #fff" /> -->
      <!-- 内容 -->
      <a-layout-content
        class="layout-content"
        style="padding: 16px; box-sizing: border-box; hight: 'auto'"
      >
        <!-- <a-breadcrumb style="margin: 16px 0">
          <a-breadcrumb-item>User</a-breadcrumb-item>
          <a-breadcrumb-item>Bill</a-breadcrumb-item>
        </a-breadcrumb> -->
        <div style="height: 100%; min-height: '100%'">
          <!-- Bill is a cat. -->
          <RouterView />
        </div>
      </a-layout-content>
      <!-- 尾部 -->
      <a-layout-footer style="text-align: center">
        © 2024 Created by s-yonggang
      </a-layout-footer>
    </a-layout>
  </a-layout>
</template>
<script lang="ts" setup>
import { RouterLink, RouterView, useRouter, useRoute } from "vue-router";
// import {
//   PieChartOutlined,
//   DesktopOutlined,
//   UserOutlined,
//   TeamOutlined,
//   FileOutlined,
// } from "@ant-design/icons-vue";

import { ref } from "vue";
const collapsed = ref<boolean>(false);
let routerPath = sessionStorage.getItem("routerPath") || "/";
const selectedKeys = ref<string[]>([routerPath]);
let routes = useRouter().options.routes;
let router = useRouter();
function onSikp(key: string) {
  selectedKeys.value = [key];
  sessionStorage.setItem("routerPath", key);
  router.push(key);
}
</script>
<style scoped>
#components-layout-demo-side .logo {
  height: 32px;
  margin: 16px;
  background: rgba(255, 255, 255, 0.3);
}

.site-layout .site-layout-background {
  background: #fff;
}
[data-theme="dark"] .site-layout .site-layout-background {
  background: #141414;
}
.layout-content {
  overflow: auto;
}

/* .ant-layout /deep/ .ant-layout-sider {
  display: none;
} */
</style>
