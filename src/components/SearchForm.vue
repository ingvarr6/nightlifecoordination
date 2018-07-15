<template>
  <div>
    <v-flex xs8 offset-sm2>
      <v-text-field
        label="Where at you location?"
        v-model="location"
        :rules="nameRules"
        required
      ></v-text-field>
    </v-flex>
    <v-btn @click="submit" class="cyan" dark>
      <div v-if="loadingBars"><v-progress-circular indeterminate color="primary"></v-progress-circular></div>
      <div v-else>Go</div>
    </v-btn>
    <div class="danger-alert" v-if="error">
      {{ error }}
    </div>
  </div>
</template>


<script>
  export default {
    data () {
      return {
        location: null,
        nameRules: [
          (v) => !!v || 'Is required'
        ],
        error: null
      }
    },
    props: [
      'getBars',
      'loadingBars'
    ],
    methods: {
      submit () {
        this.error = null
        if (this.location) {
          this.getBars(this.location)
        } else {
          this.error = 'Please fill in the location field'
        }
      }
    }
  }
</script>

<style scoped>
</style>

