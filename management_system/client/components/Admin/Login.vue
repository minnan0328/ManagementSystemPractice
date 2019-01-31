<template>
<div>
  <header>
    <div>
        <h3>後台管理系統</h3>
    </div>
  </header>
  <div id="login">登入後台</div>
  <div v-if="errorMessage.length > 0" class="error">
    {{errorMessage}}
  </div>
  <div id="AdminLogin" method="post">
      <label>帳號：</label><input type="text" v-model="adminAccount">
      <label>密碼：</label><input type="text" v-model="adminPassword">
      <button @click="checkValidation()">登入</button>
      <button @click="addAdmin()">申請帳號</button>
  </div>
</div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data () {
    return {
      adminAccount: '',
      adminPassword: '',
      errorMessage: ''
    }
  },
  mounted () {
    // this.$store.dispatch('getAdmin')
  },
  computed: mapState({
    adminDate: state => {
      return state.adminDate.admin
    }
  }),
  methods: {
    addAdmin () {
      setTimeout(() => {
        this.$router.push('/admin/addAdmin')
      }, 500)
    },
    Login () {
      this.$store.dispatch('postAdmin', {
        account: this.adminAccount,
        password: this.adminPassword,
        FailHandler: this.FailHandler,
        loginCallback: this.loginCallback
      })
    },
    checkValidation () {
      if (this.isEmpty(this.adminAccount) || this.isEmpty(this.adminPassword)) {
        this.setErrorMessage('請輸入帳號和密碼')
        this.removeErrorMessage()
      } else {
        this.setErrorMessage('')
        this.Login()
      }
    },
    isEmpty (value) {
      return value === undefined || value === null || value === ''
    },
    FailHandler () {
      this.setErrorMessage('帳號密碼不對，無法登入')
      this.removeErrorMessage()
    },
    removeErrorMessage () {
      setTimeout(() => {
        this.setErrorMessage('')
      }, 2000)
    },
    setErrorMessage: function (value) {
      this.errorMessage = value
    },
    loginCallback () {
      setTimeout(() => {
        this.$router.push('/admin')
      }, 500)
    }
  }
}
</script>

<style>
</style>
