import axios from 'axios'

export default {
  state: {
    admin: {}
  },
  actions: {
    getAdmin ({ commit, dispatch }, payload) {
      axios.get('http://localhost:8081/admin/administrant')
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
      axios.post('http://localhost:8081/admin/administrant', {
        account: payload.account,
        password: payload.password
      }).then(function (response) {
        console.log(response)
        if (response.data.success === true) {
          payload.loginCallback()
        } else {
          payload.FailHandler()
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    postAddAdmin ({ commit }, payload) {
      axios.post('http://localhost:8081/admin/administrant/add', {
        name: payload.name,
        account: payload.account,
        password: payload.password
      }).then(function (response) {
        if (response.data.success === true) {
          payload.successCallback(response.data.message)
        } else {
          payload.FailHandler()
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    postChangePassword ({ commit }, payload) {
      axios.post('http://localhost:8081/admin/administrant/updatepassword', {
        name: payload.name,
        account: payload.account,
        password: payload.password
      }).then(function (response) {
        if (response.data.success === true) {
          payload.successCallback(response.data.message)
        } else {
          payload.FailHandler(response.data.message)
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    postIndexInfo ({ commit }, payload) {
      axios.post('http://localhost:8081/api/v1/index', {
        title: payload.title,
        announce: payload.announce,
        img: payload.img
      }).then(function (response) {
        // if (response.data.success === true) {
        //   payload.successCallback(response.data.message)
        // } else {
        //   payload.FailHandler(response.data.message)
        // }
      }).catch(function (error) {
        console.log(error)
      })
    }
  },
  mutations: {
    setAdmin: (state, payload) => {
      state.admin = payload
    }
  }
}
