<template>
  <v-layout column>
    <v-flex xs6 offset-xs3>
      <panel title="Login">
        <v-text-field label="Username" v-model="username"></v-text-field>
        <br>
        <v-text-field label="Password" type="password" v-model="password"></v-text-field>
        <div class="danger-alert" v-html="error" />
        <v-btn class="cyan" dark @click="login">Login</v-btn>
      </panel>
    </v-flex>
  </v-layout>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
import Panel from '@/components/Panel'
export default {
  name: 'login',
  data () {
    return {
      username: '',
      password: '',
      error: null
    }
  },
  methods: {
    async login () {
      try {
        const responce = await AuthenticationService.login({
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
