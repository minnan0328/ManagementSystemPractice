<template>
<div>
  <div>歡迎</div>
  <div>
    <button @click="router('/admin/changePassword')">更改密碼</button>
    <button @click="router('/admin/login')">登出</button>
  </div>
  <div>
    <button @click="router('/admin/changeIndex')">該改首頁資訊</button>
  </div>

</div>

</template>

<script>

export default {
  data () {
    return {}
  },
  methods: {
    router (routers) {
      setTimeout(() => {
        this.$router.push(routers)
      }, 500)
    }
  }
}
</script>

<style>
</style>
