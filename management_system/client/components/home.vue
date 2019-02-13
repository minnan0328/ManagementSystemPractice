<template>
  <div>
    <h1>{{title}}</h1>
    <h3>{{announce}}</h3>
    <img :src="img">
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      // title: this.indexDate.title,
      // announce: this.indexDate.announce,
      // img: this.indexDate.img,
      // revisetime: this.indexDate.revisetime
    }
  },
  mounted () {
    this.$store.dispatch('getIndexData')
  },
  computed: mapState({
    title: state => state.index.title,
    announce: state => state.index.announce,
    img: state => state.index.img,
    revisetime: state => state.index.revisetime
  }),
  methods: {

  }
}
</script>

<style>
</style>
