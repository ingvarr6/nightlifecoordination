<template>
  <v-flex>
    <v-card>
      <v-card-media :src="bar.photo" height="200px">
      </v-card-media>
      <v-card-title primary-title>
        <div>
          <h3 class="headline mb-0">{{ bar.name }}</h3>
          <div>{{ bar.review }}</div>
        </div>
      </v-card-title>
      <v-card-actions>
        <v-btn class="white--text cyan" @click="goingBar">  
          <div v-if="loadingGoing === bar.id"><v-progress-circular indeterminate color="primary"></v-progress-circular></div>
          <div v-else>{{ bar.going }} Going</div>
        </v-btn>
        <a :href="bar.url" class="link-btn" target="_blank">
          <v-btn flat class="cyan--text">Explore</v-btn>
        </a>
      </v-card-actions>
    </v-card>
  </v-flex>
</template>

<script>
export default {
  data () {
    return {
      loading: false
    }
  },
  methods: {
    goingBar (event) {
      this.clickGoing(this.bar.id)
    }
  },
  props: [
    'bar',
    'clickGoing',
    'loadingGoing'
  ]
}
</script>

<style scoped>
.link-btn {
  color: white
}
</style>
