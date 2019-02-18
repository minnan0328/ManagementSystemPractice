<template>
  <div>
    <header>
    <div>
        <h3>後台管理系統</h3>
    </div>
    </header>
    <div id="login">更改後台密碼</div>
    <div v-if="errorMessage.length > 0" class="error">
      {{errorMessage}}
    </div>
    <div id="AdminLogin" method="post">
      <label>姓名：</label>
      <input type="text" v-model="name">
      <label>帳號：</label>
      <input type="text" v-model="account">
      <label>密碼：</label>
      <input type="text" v-model="password">
      <button @click="changeDate()">修改</button>
      <button @click="cancel()">取消</button>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data () {
    return {
      name: '',
      account: '',
      password: '',
      errorMessage: ''
    }
  },
  computed: mapState({
    adminDate: state => {
      return state.adminDate.admin
    }
  }),
  methods: {
    cancel () {
      setTimeout(() => {
        this.$router.push('/admin')
      }, 500)
    },
    successCallback (message) {
      this.setErrorMessage(message)
      this.removeErrorMessage()
      setTimeout(() => {
        this.$router.push('/admin/login')
      }, 500)
    },
    changePassword () {
      this.$store.dispatch('postChangePassword', {
        name: this.name,
        account: this.account,
        password: this.password,
        FailHandler: this.loginFailHandler,
        successCallback: this.successCallback
      })
    },
    changeDate () {
      this.$store.dispatch('getAdmin')
      var ps = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,18}$/
      if (this.isEmpty(this.account) || this.isEmpty(this.password) || this.isEmpty(this.name)) {
        this.setErrorMessage('請輸入資料')
        this.removeErrorMessage()
      } else {
        if (this.adminDate.name === this.name && this.adminDate.account === this.account) {
          if (ps.test(this.password)) {
            this.setErrorMessage('')
            this.changePassword()
          } else {
            this.setErrorMessage(
              '密碼必须包含至少一个字母和一个数字，密碼不能有特殊符號，最少6個字元，最多18個字元！'
            )
            this.removeErrorMessage()
          }
        } else {
          this.setErrorMessage('資料輸入錯誤')
          this.removeErrorMessage()
        }
      }
    },
    isEmpty (value) {
      return value === undefined || value === null || value === ''
    },
    loginFailHandler (message) {
      this.setErrorMessage(message)
      this.removeErrorMessage()
    },
    removeErrorMessage () {
      setTimeout(() => {
        this.setErrorMessage('')
      }, 2000)
    },
    setErrorMessage: function (value) {
      this.errorMessage = value
    }
  }
}
</script>

<style>
</style>
