<template>
<div>
  <div v-if="errorMessage.length > 0" class="error">
    {{errorMessage}}
</div>
  <h3>首頁資訊新增</h3>
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
  <hr>
  <div>
    <h3>首頁資訊總覽</h3>
    <table border=1>
      <th>ID</th>
      <th>Title</th>
      <th>Announce</th>
      <th>Img</th>
      <th>ReviseTime</th>
      <th>修改</th>
      <th>選擇</th>
      <th>刪除</th>
      <tr v-for="item in this.indexDate">
        <td>{{item.index_id}}</td>
        <td>{{item.title}}</td>
        <td>{{item.announce}}</td>
        <td><img :src="item.img"></td>
        <td>{{item.revisetime}}</td>
        <td><button >修改</button></td>
        <td><button>選擇</button></td>
        <td><button @click="deleteInfo(item.index_id)">刪除</button></td>
      </tr>
    </table>
  </div>
</div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  data () {
    return {
      title: '',
      announce: '',
      imgBroadcastList: [],
      img: '',
      errorMessage: ''
    }
  },
  mounted () {
    this.$store.dispatch('getAllIndexInfo')
  },
  computed: mapState({
    indexDate: state => {
      return state.adminDate.indexData
    }
  }),
  methods: {
    router (routers) {
      setTimeout(() => {
        this.$router.push(routers)
      }, 500)
    },
    cancel () {
      setTimeout(() => {
        this.$router.push('/admin')
      }, 500)
    },
    checkValidation () {
      if (this.isEmpty(this.title) || this.isEmpty(this.announce) || this.isEmpty(this.img)) {
        this.setErrorMessage('請輸入修改資訊')
        this.removeErrorMessage()
      } else {
        this.postIndexInfo()
      }
    },
    isEmpty (value) {
      return value === undefined || value === null || value === ''
    },
    postIndexInfo () {
      this.$store.dispatch('postAddIndexInfo', {
        title: this.title,
        announce: this.announce,
        img: this.img,
        FailHandler: this.FailHandler,
        successCallback: this.successCallback
      })
    },
    successCallback (message) {
      this.setErrorMessage(message)
      this.removeErrorMessage()
      this.$store.dispatch('getAllIndexInfo')
    },
    FailHandler (message) {
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
    },
    deleteInfo (id) {
      this.$store.dispatch('deleteIndexInfo', {
        id: id,
        FailHandler: this.FailHandler,
        successCallback: this.successCallback
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
          // console.log(reader.result)
          resolve(reader.result)
        }
        reader.onerror = reject
      })
      ImgToBase64.then((result) => {
        // var base64Data = result.replace(/^data:image\/\w+;base64,/, '')
        this.img = result
        // console.log(this.img)
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
