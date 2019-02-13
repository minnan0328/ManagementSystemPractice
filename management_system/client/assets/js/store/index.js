import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import usersDate from './usersData'
import adminDate from './adminData'
// import FileReader from 'fileReader'

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
      axios.post('http://localhost:8081/api/v1/index')
        .then((res) => {
          var data = res.data
          console.log(data)
          var objectURL = `data:image/png;base64,${data.img}`
          // var binary = fixBinary(atob(data.img))
          // var z = new Blob([binary], {
          //   type: 'image/png'
          // })
          // var objectURL = URL.createObjectURL(z)
          // console.log(binary)
          // console.log(z)
          console.log(objectURL)
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
      console.log(payload)
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
