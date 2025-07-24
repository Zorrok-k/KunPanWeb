<template>
  <el-row class="header"> 这是 header 放点什么东西 </el-row>
  <el-row class="content">
    <el-col class="sidebar" :span="1"></el-col>
    <el-col class="router" :span="23">
      <router-view />
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
// import router from "@/router";
// import { ref } from "vue";
</script>

<style lang="scss" scoped>
.header {
  height: 5vh;
  background-color: rgb(255, 255, 255);
  box-shadow: var(--el-box-shadow);
  z-index: 999;
}
.content {
  flex: 1;
  background-color: rgb(255, 255, 255);
}
.sidebar {
  box-shadow: var(--el-box-shadow);
  z-index: 998;
}
.router {
  display: flex;
  flex-direction: column;
  height: 95vh;
}
</style>
