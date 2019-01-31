<template>
  <div>
    <header>
      <div>
        <h3>後台管理系統</h3>
      </div>
    </header>
    <div id="login">申請管理者帳號</div>
    <div v-if="errorMessage.length > 0" class="error">{{errorMessage}}</div>
    <div id="AdminLogin" method="post">
      <label>姓名：</label>
      <input type="text" v-model="addName">
      <label>帳號：</label>
      <input type="text" v-model="addAccount">
      <label>密碼：</label>
      <input type="text" v-model="addPassword">
      <button @click="checkValidation()">確定</button>
      <button @click="cancel()">取消</button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      addName: '',
      addAccount: '',
      addPassword: '',
      errorMessage: ''
    }
  },
  mounted () {},
  methods: {
    successCallback (message) {
      this.setErrorMessage(message)
      this.removeErrorMessage()
      setTimeout(() => {
        this.$router.push('/admin/login')
      }, 500)
    },
    cancel () {
      setTimeout(() => {
        this.$router.push('/admin/login')
      }, 500)
    },
    addAdmin () {
      this.$store.dispatch('postAddAdmin', {
        name: this.addName,
        account: this.addAccount,
        password: this.addPassword,
        FailHandler: this.FailHandler,
        successCallback: this.successCallback
      })
    },
    checkValidation () {
      var ps = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,18}$/
      // var str_acc = /(?!.*[\W])/
      if (
        this.isEmpty(this.addName) || this.isEmpty(this.addAccount) || this.isEmpty(this.addPassword)) {
        this.setErrorMessage('請務必填寫資料！')
        this.removeErrorMessage()
      } else {
        if (ps.test(this.addPassword)) {
          this.setErrorMessage('')
          this.addAdmin()
        } else {
          this.setErrorMessage('密碼必须包含至少一个字母和一个数字，密碼不能有特殊符號，最少6個字元，最多18個字元！')
          this.removeErrorMessage()
        }
      }
    },
    isEmpty (value) {
      return value === undefined || value === null || value === ''
    },
    FailHandler () {
      this.setErrorMessage('申請失敗，請洽系統管理者！')
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
