<script lang="ts">
// @ts-ignore
import { computed, defineComponent, reactive, ref } from 'vue'
import { ElCard, ElForm, ElFormItem, ElButton, ElInput, ElNotification } from 'element-plus'
import { useStore } from '@/store'
import StateTest from '../test/index.vue'
// @ts-ignore
import { Button } from 'ant-design-vue'
import 'ant-design-vue/lib/button/style/index.css'
export default defineComponent({
  name: 'User',
  components: {
    StateTest,
    ElCard,
    ElForm,
    ElButton,
    ElFormItem,
    ElInput,
    Button
  },

  setup() {
    const params = reactive({
      userName: '',
      password: ''
    })
    const store = useStore()
    const userInfo = computed(() => {
      return store.state.user.userInfo
    })

    const loading = ref(false)
    const isLogin = computed(() => !!userInfo.value.token)
    const submitHandle = () => {
      const { userName, password } = params
      if (!userName) {
        ElNotification({
          type: 'error',
          title: 'Error',
          message: 'Username is required'
        })
        return
      }
      if (!password) {
        ElNotification({
          type: 'error',
          title: 'Error',
          message: 'Password is required'
        })
        return
      }
      loading.value = true
      window.setTimeout(() => {
        store.commit('user/updateUser', {
          name: userName,
          userId: 1,
          token: Math.random().toString(36).slice(-8)
        })
        loading.value = false
      }, 1500)
    }

    return {
      params,
      loading,
      submitHandle,
      userInfo,
      isLogin
      //
    }
  }
})
</script>

<style lang="scss" scope>
.form {
  width: 450px;
  margin: 0 auto;
}
.box-card {
  width: 480px;
  margin: 20px auto;
}
.user {
  background-color: red;
}
</style>

<template>
  <div class="user">
    User Page
    <StateTest></StateTest>
    <div>
      <Button type="primary"> Primary </Button>
    </div>
    <div v-if="isLogin" class="info">
      <el-card class="box-card">
        <div>User logged in</div>
        <div>UserName: {{ userInfo.name }}</div>
      </el-card>
    </div>
    <el-form v-else class="form">
      <el-form-item label="UserName">
        <el-input v-model="params.userName" />
      </el-form-item>
      <el-form-item label="Password">
        <el-input v-model="params.password" type="password" />
      </el-form-item>
      <el-form-item>
        <el-button :loading="loading" type="success" @click="submitHandle"> Submit </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
