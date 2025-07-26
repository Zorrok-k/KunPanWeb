/// <reference types="vite/client" />
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const vueComponent: DefineComponent<{}, {}, any>
  export default vueComponent
}
// src/vite-env.d.ts
interface Window {
  config: {
    BASE_URL: string
  }
}
