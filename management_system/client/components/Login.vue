<template>
  <div>ddwedewdew</div>
</template>

<script>
import {mapState} from 'vuex'

export default {
  data () {
    return {}
  },
  mounted () {
    this.$store.dispatch('getUsers')
  },
  computed: mapState({
    usersDate: state => {
      return state.usersDate
    }
  })
}
</script>

<style>
</style>
