import { defineComponent, ref } from 'vue'
// @ts-ignore
import { ElSwitch } from 'element-plus'
import 'element-plus/theme-chalk/el-switch.css'
import GMap from '../main/map/index.vue'
import StateTest from '../main/test/index.vue'
export default defineComponent({
  name: 'Index',
  setup() {
    const isActive = ref(false)

    return () => (
      <div class="index">
        <ElSwitch v-model={isActive.value} active-color="#13ce66" inactive-color="#ff4949">
          Switch
        </ElSwitch>
        <StateTest></StateTest>
        <GMap></GMap>
      </div>
    )
  }
})
