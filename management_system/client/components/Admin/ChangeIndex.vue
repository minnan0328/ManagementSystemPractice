<template>
<div>
  <div>首頁資訊修改</div>
  <div id="AdminLogin" method="post">
    <label>標題：</label><input type="text" v-model="title">
    <label>公告：</label><input type="text" v-model="announce">
    <label>上傳圖片：</label><input type="file"
    ref="imgBroadcastUpload"
    @change="imgBroadcastChange"
    @file-list="imgBroadcastList"
    @remove="imgBroadcastRemove"
    accept="image/jpg,image/png,image/jpeg"
    action="" />
    <button @click="checkValidation()">確定</button>
    <button @click="cancel()">取消</button>
  </div>

</div>
</template>

<script>
// import { mapState } from 'vuex'
// import { uploadImgToBase64 } from './../../assets/js/utils/utils.js'
export default {

  data () {
    return {
      title: '',
      announce: '',
      imgBroadcastList: [],
      img: ''
    }
  },
  mounted () {
    // this.$store.dispatch('getAdmin')
  },
  methods: {
    router (routers) {
      setTimeout(() => {
        this.$router.push(routers)
      }, 500)
    },
    cancel () {
      setTimeout(() => {
        this.$router.push('/admin/login')
      }, 500)
    },
    checkValidation () {
      this.$store.dispatch('postIndexInfo', {
        title: this.title,
        announce: this.announce,
        img: this.img
      })
    },

    imgBroadcastChange (file) {
      // this.imgBroadcastList.push(file)
      this.submitDialogData(file.target.files[0])
    },
    // 有圖片移除後 觸發
    imgBroadcastRemove (file, fileList) {
      this.diaLogForm.imgBroadcastList = fileList
    },
    submitDialogData (filePromises) {
      // const imgBroadcastListBase64 = []
      // const filePromises = this.imgBroadcastList.map(file => {
      //   const response = file.target.files[0]
      //   console.log(response)
      //   return response
      // })
      // console.log(filePromises[0])
      var ImgToBase64 = new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(filePromises)
        reader.onload = function () { // 圖片轉base64完成後返回reader物
          console.log(reader.result)
          resolve(reader.result)
        }
        reader.onerror = reject
      })
      ImgToBase64.then((result) => {
        var base64Data = result.replace(/^data:image\/\w+;base64,/, "");
        this.img = base64Data
        console.log(this.img)
        // console.log(result)
      })

      // for (const textPromise of filePromises) {
      //   imgBroadcastListBase64.push(textPromise)
      // }
      // console.log('圖片轉base64結束..., ', imgBroadcastListBase64)
      // this.imgs = imgBroadcastListBase64.join()
    }
  }
}
</script>

<style>
</style>
