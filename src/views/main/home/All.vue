<template>
  <el-row class="content">
    <el-col class="fileList" :span="19">
      <!-- 路径栏 -->
      <el-row class="path" align="middle"> {{ pathNow }} </el-row>
      <!-- 真·文件列表 -->
      <el-row>
        <el-col>
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
          <el-scrollbar height="80vh" @end-reached="getFileList">
            <el-checkbox-group v-model="checkedFiles">
              <el-row class="file" v-for="file in files" :key="file.id" align="middle">
                <el-col :span="2">
                  <el-checkbox :value="file.id" />
                </el-col>
                <el-col :span="10">{{ file.name + file.suffix }}</el-col>
                <el-col :span="4">{{ file.size === 0 ? '-' : formatFileSize(file.size) }}</el-col>
                <el-col :span="4">{{ formatFileType(file.type) }}</el-col>
                <el-col :span="4">{{ formatTime(file.update) }}</el-col>
              </el-row>
            </el-checkbox-group>
          </el-scrollbar>
        </el-col>
      </el-row>
    </el-col>
    <el-col :span="5">文件详情</el-col>
  </el-row>
</template>

<script lang="ts" setup>
import { useApiStore } from '@/store/api'
import type { ScrollbarDirection } from 'element-plus'
import { onMounted, ref, watch } from 'vue'

// =============Pinia=============
const api = useApiStore()

// =============变量区域=============

// 当前选中的文件 ID
const checkedFiles = ref<string[]>([])
// 全选框的状态
const checkAll = ref(false)
// 半选状态
const isIndeterminate = ref(false)
// 查询到的文件数组
interface PanFile {
  id: string
  hash: string
  type: number
  name: string
  suffix: string
  size: number
  status: number
  create: number
  update: number
  read: number
  download: number
  directory: string
  path: string
}
const files = ref<PanFile[]>([])
// 当前页面路径
const pathNow = ref('\\')
// 当前页码
const page = ref(1)

// =============钩子区域=============
onMounted(async () => {
  const response = await api.file.read(pathNow.value, 50, page.value)
  files.value = response.data
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
const getFileList = async (direction: ScrollbarDirection) => {
  if (direction === 'bottom') {
    page.value++
    console.log(`发起请求，路径${pathNow.value}`)
    const response = await api.file.read(pathNow.value, 50, page.value)
    files.value.push(response.data)
  }
}

// 格式化
const formatFileType = (type: string | number): string => {
  const map: { [key: string]: string } = {
    '-1': '文件夹',
    '0': '其他',
    '1': '图片',
    '2': '视频',
    '3': '音频',
    '4': '文档',
    '5': '压缩包'
  }
  return map[type.toString()] || '未知'
}

// 格式化
const formatFileSize = (sizeInKB: number): string => {
  if (sizeInKB < 1024) {
    return `${sizeInKB} KB`
  }
  const sizeInMB = sizeInKB / 1024
  if (sizeInMB < 1024) {
    return `${sizeInMB.toFixed(2)} MB`
  }
  const sizeInGB = sizeInMB / 1024
  return `${sizeInGB.toFixed(2)} GB`
}

// 格式化
const formatTime = (timestamp: number): string => {
  const date = new Date(timestamp)
  const year = date.getFullYear()
  const month = date.getMonth() + 1 // 月份从 0 开始
  const day = date.getDate()
  const hours = date.getHours()
  const minutes = date.getMinutes()

  // 补零函数
  const padZero = (num: number): string => (num < 10 ? `0${num}` : `${num}`)

  return `${year}-${month}-${day} ${padZero(hours)}:${padZero(minutes)}`
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
  font-size: 1rem;
}
</style>
