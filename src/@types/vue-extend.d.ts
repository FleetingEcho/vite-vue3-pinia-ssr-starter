import { TRootStore } from '../store'
import { RouteRecordRaw } from 'vue-router'
import ElMessage from 'element-plus/es/components/message/index'
import ElNotification from 'element-plus/lib/components/notification/index'
import ElLoading from 'element-plus/es/components/loading/index'
import { Store } from 'vuex'

export interface IAsyncDataContext {
  route: RouteRecordRaw
  store: Store<TRootStore>
}
declare module '@vue/runtime-core' {
  interface ComponentCustomOptions {
    asyncData?(context: IAsyncDataContext): Promise<any>
  }

  interface ComponentCustomProperties {
    $message: typeof ElMessage
    $notify: typeof ElNotification
    $loading: typeof ElLoading
  }
}
