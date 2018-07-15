<template>
  <v-layout>
    <v-flex xs6 offset-xs3>
      <h2>Plans Tonight? </h2>
      <br>
      <search-form :getBars="getBars" :loadingBars="loadingBars" />
      <br>
      <br>
      <panel v-if="bars" :title="location">
        <div v-for="bar in bars" :key="bar.id">
          <div class="pt-2 pb-2">
            <card :bar="bar" :clickGoing="goingBar" :loadingGoing="loadingGoing"/>
          </div>
        </div>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import Panel from '@/components/Panel'
import SearchForm from '@/components/SearchForm'
import BarsService from '@/services/BarsService'
import Card from '@/components/Card'

export default {
  data () {
    return {
      bars: null,
      location: null,
      loadingBars: false,
      loadingGoing: false
    }
  },
  methods: {
    async getBars (location) {
      this.loadingBars = true
      this.bars = (await BarsService.getBars({ location: location })).data
      this.location = `Bars in ${location}`
      this.loadingBars = false
    },
    async goingBar (barId) {
      this.loadingGoing = barId
      try {
        const responseBar = (await BarsService.goingBar({ barId: barId }))
        this.bars.forEach(function (bar) {
          if (bar.id === responseBar.data.id) {
            bar.going = responseBar.data.going
          }
        })
        this.loadingGoing = false
      } catch (err) {
        if (err.response.status === 401) {
          this.$router.push({
            name: 'register'
          })
        }
      }
    }
  },
  components: {
    Panel,
    SearchForm,
    Card
  }
}
</script>

<style scoped>
.photo {
  width: 100%;
  border-radius: 3px;
}
</style>
