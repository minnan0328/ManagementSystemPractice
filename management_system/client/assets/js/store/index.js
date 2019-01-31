import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import usersDate from './usersData'
import adminDate from './adminData'

Vue.use(Vuex)
const store = new Vuex.Store({
  modules: {
    usersDate: usersDate,
    adminDate: adminDate
  },
  state: {
    users: []
  },
  actions: {
    getUsers ({ commit }) {
      axios.get('http://localhost:3000/api/v1/users')
        .then((res) => {
          console.log(res.data)
          commit('setUsers', res.data)
        }, (err) => {
          console.log(err)
        })
    }
  },
  mutations: {
    setUsers: (state, payload) => {
      state.users = payload
    }
  }
})
export default store
