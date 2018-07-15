<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
      <panel title="Register">
        <v-text-field label="Username" v-model="username"></v-text-field>
        <br>
        <v-text-field label="Password" type="password" v-model="password"></v-text-field>
        <br>
        <div class="error" v-html="error" />
        <v-btn class="cyan" dark @click="register">Register</v-btn>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
import Panel from '@/components/Panel'
export default {
  name: 'register',
  data () {
    return {
      username: '',
      password: '',
      error: null
    }
  },
  methods: {
    async register () {
      try {
        const responce = await AuthenticationService.register({
          username: this.username,
          password: this.password
        })
        this.$store.dispatch('setUser', responce.data.user)
        this.$router.push({
          name: 'root'
        })
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  },
  components: {
    Panel
  }
}
</script>

<style scoped>

</style>
