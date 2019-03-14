import axios from 'axios'
import DBconfig from './../../data/db_config.json'
export default {
  state: {
    admin: {},
    indexData: {}
  },
  actions: {
    getAdmin ({ commit, dispatch }, payload) {
      // 'http://localhost:8081/admin/administrant'
      var url = `${DBconfig.api.url}${DBconfig.api.admin.getAdmin}`
      axios.get(url)
        .then((res) => {
          var data = {
            name: res.data[0].name,
            account: res.data[0].account
          }
          commit('setAdmin', data)
        }, (err) => {
          console.log(err)
        })
    },
    postAdmin ({ commit }, payload) {
      // 'http://localhost:8081/admin/administrant'
      var url = `${DBconfig.api.url}${DBconfig.api.admin.sigions}`
      axios.post(url, {
        account: payload.account,
        password: payload.password
      }).then((response) => {
        if (response.data.success === true) {
          payload.loginCallback()
        } else {
          payload.FailHandler()
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    postAddAdmin ({ commit }, payload) {
      // 'http://localhost:8081/admin/administrant/add'
      var url = `${DBconfig.api.url}${DBconfig.api.admin.addAdmin}`
      axios.post(url, {
        name: payload.name,
        account: payload.account,
        password: payload.password
      }).then((response) => {
        if (response.data.success === true) {
          payload.successCallback(response.data.message)
        } else {
          payload.FailHandler()
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    postChangePassword ({ commit }, payload) {
      // 'http://localhost:8081/admin/administrant/updatepassword'
      var url = `${DBconfig.api.url}${DBconfig.api.admin.updatePassword}`
      axios.post(url, {
        name: payload.name,
        account: payload.account,
        password: payload.password
      }).then((response) => {
        if (response.data.success === true) {
          payload.successCallback(response.data.message)
        } else {
          payload.FailHandler(response.data.message)
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    postAddIndexInfo ({ commit }, payload) {
      // 'http://localhost:8081/api/v1/index/add'
      var url = `${DBconfig.api.url}${DBconfig.api.user.addIndex}`
      axios.post(url, {
        title: payload.title,
        announce: payload.announce,
        img: payload.img,
        isShows: payload.isShows
      }).then((response) => {
        var message = '新增成功'
        if (response.data.success === true) {
          payload.successCallback(message)
        } else {
          payload.FailHandler(response.data.message)
        }
      }).catch((error) => {
        console.log(error)
      })
    },
    getAllIndexInfo ({ commit }, payload) {
      // 'http://localhost:8081/api/v1/index/all'
      var url = `${DBconfig.api.url}${DBconfig.api.user.getAllIndexInfo}`
      axios.post(url)
        .then((response) => {
          console.log(response.data)
          response.data.forEach(item => {
            item.img = `data:image/png;base64,${item.img}`
          })
          commit('setIndex', response.data)
        }).catch((error) => {
          console.log(error)
        })
    },
    updateIndexInfo ({commit}, payload) {
      // http://localhost:8081/api/v1/index/update:id
      var id = payload.id
      var url = `${DBconfig.api.url}${DBconfig.api.user.updateIndex}:${id}`
      axios.post(url, {
        id: id,
        title: payload.title,
        announce: payload.announce,
        img: payload.img
      })
        .then((response) => {
          var message = '更新成功'
          if (response.data.success === true) {
            payload.successCallback(message)
          } else {
            payload.FailHandler(response.data.message)
          }
        }).catch((error) => {
          console.log(error)
        })
    },
    selectIndexInfo ({ commit }, payload) {
      // http://localhost:8081/api/v1/index/update/select:id
      var id = payload.id
      var url = `${DBconfig.api.url}${DBconfig.api.user.selectIndex}:${id}`
      axios.post(url, {
        id: id,
        shows: true
      })
        .then((response) => {
          var message = '更新成功'
          if (response.data.success === true) {
            payload.successCallback(message)
          } else {
            payload.FailHandler(response.data.message)
          }
        }).catch((error) => {
          console.log(error)
        })
    },
    deleteIndexInfo ({commit}, payload) {
      // `http://localhost:8081/api/v1/index:${id}`
      var id = payload.id
      var url = `${DBconfig.api.url}${DBconfig.api.user.deleteIndex}:${id}`
      axios.post(url, {
        id: id,
        time: payload.time
      })
        .then((response) => {
          console.log(response)
          var message = '刪除成功'
          if (response.data.success === true) {
            payload.successCallback(message)
          } else {
            payload.FailHandler(response.data.message)
          }
        }).catch((error) => {
          console.log(error)
        })
    }
  },
  mutations: {
    setAdmin: (state, payload) => {
      state.admin = payload
    },
    setIndex: (state, payload) => {
      state.indexData = payload
    }
  }
}
