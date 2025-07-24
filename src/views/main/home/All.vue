<template>
  <el-row class="content">
    <el-col class="fileList" :span="19">
      <!-- 路径栏 -->
      <el-row class="path" align="middle"> /root/xxx/xxxx/xxxx </el-row>
      <!-- 真·文件列表 -->
      <el-row>
        <el-col>
          <!-- 排序工具栏 -->
          <el-row align="middle">
            <el-col :span="2">
              <el-checkbox
                :model="checkAll"
                :indeterminate="isIndeterminate"
                @change="handleCheckAllChange"
              />
            </el-col>
            <el-col :span="10">文件名</el-col>
            <el-col :span="4">大小</el-col>
            <el-col :span="4">类型</el-col>
            <el-col :span="4">修改时间</el-col>
          </el-row>
          <el-scrollbar height="80vh" @end-reached="getFiles">
            <el-row class="file" v-for="file in files" :key="file.id" align="middle">
              <el-col :span="2">
                <el-checkbox :model="checkedFiles" :label="file.id"><br /></el-checkbox>
              </el-col>
              <el-col :span="10">{{ file.name }}</el-col>
              <el-col :span="4">{{ file.size }}</el-col>
              <el-col :span="4">{{ file.type }}</el-col>
              <el-col :span="4">{{ file.updateTime }}</el-col>
            </el-row>
          </el-scrollbar>
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="5">文件详情</el-col>
  </el-row>
</template>

<script lang="ts" setup>
import type { ScrollbarDirection } from 'element-plus'
import { nanoid } from 'nanoid'
import { onMounted, ref, watch } from 'vue'

// =============变量区域=============

// 当前选中的文件 ID
const checkedFiles = ref<string[]>([])

// 全选框的状态
const checkAll = ref(false)
// 半选状态
const isIndeterminate = ref(false)

// 查询到的文件数组
const files = ref<{ id: string; name: string; size: string; type: string; updateTime: string }[]>(
  []
)

// =============钩子区域=============
onMounted(() => {
  console.log('发起请求')
  for (let i = 0; i < 50; i++) {
    files.value.push({
      id: nanoid(10),
      name: i + '_TestFileName_' + nanoid(6),
      size: '32MB',
      type: '未知',
      updateTime: '未知'
    })
  }
})

// =============函数区域=============

// 全选操作
const handleCheckAllChange = (val: boolean) => {
  if (val) {
    checkedFiles.value = files.value.map((file) => file.id)
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

// 模拟请求
const getFiles = (direction: ScrollbarDirection) => {
  if (direction === 'bottom') {
    console.log('发起请求')
    const num = files.value.length
    for (let i = num; i < num + 20; i++) {
      files.value.push({
        id: nanoid(10),
        name: i + '_TestFileName_' + nanoid(6),
        size: '32MB',
        type: '未知',
        updateTime: '未知'
      })
    }
  }
}

// =============监听区域=============
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
