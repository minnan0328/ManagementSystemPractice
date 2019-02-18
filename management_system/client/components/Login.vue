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
    // this.$store.dispatch('getConfigInfo')
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
