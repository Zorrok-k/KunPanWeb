<template>
  <el-row class="content">
    <el-col class="fileList" :span="19">
      <!-- 路径栏 -->
      <el-row class="path" align="middle"> /root/xxx/xxxx/xxxx </el-row>
      <!-- 真·文件列表 -->
      <el-row>
        <el-col>
          <el-scrollbar height="82vh">
            <!-- 排序工具栏 -->
            <el-row align="middle">
              <el-col :span="2">
                <el-checkbox
                  v-model="checkAll"
                  :indeterminate="isIndeterminate"
                  @change="handleCheckAllChange"
                />
              </el-col>
              <el-col :span="10">文件名</el-col>
              <el-col :span="4">大小</el-col>
              <el-col :span="4">类型</el-col>
              <el-col :span="4">修改时间</el-col>
            </el-row>
            <el-row class="file" v-for="file in files" :key="file" align="middle">
              <el-col :span="2">
                <el-checkbox v-model="checkedFiles" :label="file"><br /></el-checkbox>
              </el-col>
              <el-col :span="10">{{ file }}</el-col>
              <el-col :span="4">大小</el-col>
              <el-col :span="4">类型</el-col>
              <el-col :span="4">修改时间</el-col>
            </el-row>
          </el-scrollbar>
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="5">文件详情</el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'

// 当前选中的文件列表
const checkedFiles = ref<string[]>([])

// 全选框的状态
const checkAll = ref(false)
// 半选状态
const isIndeterminate = ref(false)

// 假设你有 80 个文件，用数组模拟
const files = ref(Array.from({ length: 80 }, (_, i) => `文件-${i + 1}`))

// 全选操作
const handleCheckAllChange = (val: boolean) => {
  if (val) {
    checkedFiles.value = [...files.value] // 全选
  } else {
    checkedFiles.value = [] // 取消全选
  }
  isIndeterminate.value = false
}

// 单个 checkbox 变化时更新全选状态
const handleCheckedFilesChange = (value: string[]) => {
  const checkedCount = value.length
  checkAll.value = checkedCount === files.value.length
  isIndeterminate.value = checkedCount > 0 && checkedCount < files.value.length
}

watch(
  () => checkedFiles.value,
  (newVal) => {
    handleCheckedFilesChange(newVal)
  }
)
</script>

<style lang="scss" scoped>
.content {
  flex: 1;
  padding: 10px;
  background-color: rgb(255, 253, 253);
}
.fileList {
  border-right: solid 1px rgb(241, 242, 244);
  overflow: hidden;
}
.path {
  height: 5vh;
  font-size: 1rem;
}
a {
  text-decoration: none;
  color: black;
  font-weight: 800;
}
a:hover {
  cursor: pointer;
}
.file {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
