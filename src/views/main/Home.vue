<template>
  <el-row class="content">
    <el-col class="sidebar" :span="3">
      <el-row justify="center" v-for="button in fileTypeButtons">
        <el-button
          @click="button.action"
          :bg="isActive(button.routeName) ? true : false"
          :type="isActive(button.routeName) ? 'primary' : 'info'"
          text
        >
          {{ button.text }}
        </el-button>
      </el-row>
      <el-divider />
      <el-button
        @click="router.push({ name: 'recycle' })"
        :bg="isActive('recycle') ? true : false"
        :type="isActive('recycle') ? 'primary' : 'info'"
        text
      >
        回收站
      </el-button>
      <el-divider />
      <el-row justify="center" v-for="button in recentFileButtons">
        <el-button text @click="button.action"> {{ button.text }} </el-button>
      </el-row>
    </el-col>
    <el-col class="fileManger" :span="21">
      <!-- 工具栏 -->
      <el-row class="toolBar" justify="space-between">
        <el-col :span="19">
          <el-button type="primary" round @click=""> 上传文件 </el-button>
        </el-col>
        <el-col :span="5">搜索输入框</el-col>
      </el-row>
      <el-row>
        <el-col class="router">
          <router-view />
        </el-col>
      </el-row>
    </el-col>
  </el-row>
</template>

<script lang="ts" setup>
import router from '@/router'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

// 变量
const route = useRoute()

const fileTypeButtons = [
  {
    text: '全部文件',
    action: () => router.push({ name: 'all' }),
    routeName: 'all'
  },
  {
    text: '图片',
    action: () => router.push({ name: 'picture' }),
    routeName: 'picture'
  },
  {
    text: '视频',
    action: () => router.push({ name: 'video' }),
    routeName: 'video'
  },
  {
    text: '文档',
    action: () => router.push({ name: 'document' }),
    routeName: 'document'
  },
  {
    text: '音频',
    action: () => router.push({ name: 'audio' }),
    routeName: 'audio'
  },
  {
    text: '其他',
    action: () => router.push({ name: 'other' }),
    routeName: 'other'
  }
]

// 最近文件按钮组
const recentFileButtons = ref([
  {
    text: '测试',
    action: () => console.log('测试')
  }
])

//函数

// 判断当前路由是否匹配按钮的 routeName
const isActive = (routeName: string) => {
  return route.name === routeName
}
</script>

<style lang="scss" scoped>
.content {
  flex: 1;
  background-color: rgb(255, 255, 255);
}
.sidebar {
  border-right: solid 1px rgb(241, 242, 244);
  padding: 20px;
}
.sidebar button {
  width: 100%;
  height: 40px;
  font-size: 1rem;
  margin-top: 5px;
  margin-bottom: 5px;
}
.el-divider--horizontal {
  margin-top: 5px;
  margin-bottom: 5px;
}
.toolBar {
  height: 5vh;
  padding: 10px;
}
.toolBar button {
  font-size: 1rem;
}
.router {
  display: flex;
  flex-direction: column;
  height: 90vh;
}
</style>
