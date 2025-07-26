import api from '@/apis/index'
import { defineStore } from 'pinia'

export const useApiStore = defineStore('api', () => {
  return api
})
