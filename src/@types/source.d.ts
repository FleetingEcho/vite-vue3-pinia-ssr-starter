declare const React: string
declare module '*.json'
declare module '*.png'
declare module '*.jpg'
declare module 'element-plus/lib/index.esm'

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: 'development' | 'production'
  }
  interface Process {
    env: ProcessEnv
  }
}

interface Window {
  __INITIAL_STATE__: any
  __INITIAL_STATE__PINIA: any
  __PINIA_STATE__: any
}
