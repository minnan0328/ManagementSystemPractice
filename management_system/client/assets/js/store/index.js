import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import usersDate from './usersData'
import adminDate from './adminData'
import DBconfig from './../../data/db_config.json'

console.log(DBconfig)
Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    usersDate: usersDate,
    adminDate: adminDate
  },
  state: {
    index: {}
  },
  actions: {
    getIndexData ({ commit }) {
      var url = `${DBconfig.api.url}${DBconfig.api.user.getIndex}`
      // 'http://localhost:8081/api/v1/index'
      axios.post(url)
        .then((res) => {
          var data = res.data
          console.log(data)
          var objectURL = `data:image/png;base64,${data.img}`
          var payload = {
            img: objectURL,
            title: data.title,
            announce: data.announce,
            revisetime: data.revisetime
          }
          commit('setIndex', payload)
        }).catch((error) => {
          console.log(error)
        })
    }
  },
  mutations: {
    setIndex: (state, payload) => {
      state.index = payload
    }
  }
})
export default store

// function fixBinary (bin) {
//   var length = bin.length
//   var buf = new ArrayBuffer(length)
//   var arr = new Uint8Array(buf)
//   for (var i = 0; i < length; i++) {
//     arr[i] = bin.charCodeAt(i)
//   }
//   return buf
// }
