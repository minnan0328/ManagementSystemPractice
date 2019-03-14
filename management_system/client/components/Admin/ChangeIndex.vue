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
    accept="image/jpg,image/png,image/jpeg"
    action="" />
    <from>
      <select v-model="selectshow">
      <label>是否使用</label>
      <option>請選擇</option>
      　<option :value="true">是</option>
      　<option :value="false">否</option>
      </select>
    </from>
    <button @click="checkValidation()">確定</button>
    <button @click="cancel()">取消</button>
  </div>
  <hr>
  <div>
    <h3>首頁資訊總覽</h3>
    <table border=1>
      <tr>
        <th>ID</th>
        <th>Title</th>
        <th>Announce</th>
        <th>Img</th>
        <th>ReviseTime</th>
        <th>use</th>
        <th>修改</th>
        <th>選擇</th>
        <th>刪除</th>
      </tr>
      <tr v-for="item in this.indexDate">
        <td>{{item.index_id}}</td>
        <td>{{item.title}}</td>
        <td>{{item.announce}}</td>
        <td><img :src="item.img"></td>
        <td>{{item.revisetime}}</td>
        <td v-if="item.shows === 1">true</td>
        <td v-else>false</td>
        <td><button @click="modifyIndexInfo(item)">修改</button></td>
        <td><button @click="selectIndexInfo(item)">選擇</button></td>
        <td><button @click="deleteIndexInfo(item)">刪除</button></td>
      </tr>
    </table>
  </div>
  <div id="modifyCard" v-show="isModifyCard">
    <div id="card">
      <h3>修改前資訊</h3>
      <div id="originalImg">
        <img :src="originalImg">
      </div>
      <div id="originalInfo">
        <p>Id：{{originalID}}</p>
        <p>Title：{{originalTitle}}</p>
        <p>Announce：{{originalAnnounce}}</p>
        <p>{{originalboolean}}</p>
      </div>
      <h3>修改資訊</h3>
      <div id="AdminLogin" method="post">
        <label>標題：</label><input type="text" v-model="title">
        <label>公告：</label><input type="text" v-model="announce">
        <label>上傳圖片：</label><input type="file"
        ref="imgBroadcastUpload"
        @change="imgBroadcastChange"
        accept="image/jpg,image/png,image/jpeg"
        action="" />
        <button @click="checkModifyValidation()">確定</button>
        <button @click="modifyCancel()">取消</button>
      </div>
    </div>
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
      img: '',
      errorMessage: '',
      originalID: '',
      originalTitle: '',
      originalAnnounce: '',
      originalImg: '',
      originalboolean: null,
      isModifyCard: false,
      selectshow: false
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
      // var shows = this.selectshow
      // console.log(shows)
      this.$store.dispatch('postAddIndexInfo', {
        title: this.title,
        announce: this.announce,
        img: this.img,
        isShows: this.selectshow,
        FailHandler: this.FailHandler,
        successCallback: this.successCallback
      })
    },
    successCallback (message) {
      this.setErrorMessage(message)
      this.removeErrorMessage()
      this.$store.dispatch('getAllIndexInfo')
      if (this.isModifyCard === true) {
        this.modifyCancel()
      }
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
    modifyIndexInfo (item) {
      console.log(item)
      this.originalID = item.index_id
      this.originalTitle = item.title
      this.originalAnnounce = item.announce
      this.originalImg = item.img
      this.originalboolean = item.shows
      this.isModifyCard = true
    },
    checkModifyValidation () {
      if (this.isEmpty(this.title) || this.isEmpty(this.announce) || this.isEmpty(this.img)) {
        this.setErrorMessage('請輸入修改資訊')
        this.removeErrorMessage()
      } else {
        this.postModifyIndexInfo()
      }
    },
    postModifyIndexInfo () {
      this.$store.dispatch('updateIndexInfo', {
        id: this.originalID,
        title: this.title,
        announce: this.announce,
        img: this.img,
        FailHandler: this.FailHandler,
        successCallback: this.successCallback
      })
    },
    selectIndexInfo (item) {
      this.$store.dispatch('selectIndexInfo', {
        id: item.index_id,
        FailHandler: this.FailHandler,
        successCallback: this.successCallback
      })
    },
    modifyCancel () {
      this.isModifyCard = false
      this.originalID = ''
      this.originalTitle = ''
      this.originalAnnounce = ''
      this.originalImg = ''
    },
    deleteIndexInfo (item) {
      this.$store.dispatch('deleteIndexInfo', {
        id: item.index_id,
        time: item.revisetime,
        FailHandler: this.FailHandler,
        successCallback: this.successCallback
      })
    },
    imgBroadcastChange (file) {
      this.submitDialogData(file.target.files[0])
    },
    submitDialogData (filePromises) {
      if (this.isEmpty(filePromises) || this.isEmpty(filePromises) || this.isEmpty(filePromises)) {

      } else {
        var ImgToBase64 = new Promise((resolve, reject) => {
          const reader = new FileReader()
          reader.readAsDataURL(filePromises)
          reader.onload = function () { // 圖片轉base64完成後返回reader物
            resolve(reader.result)
          }
          reader.onerror = reject
        })
        ImgToBase64.then((result) => {
          this.img = result
        })
      }
    }
  }
}
</script>

<style lang="sass">

</style>
