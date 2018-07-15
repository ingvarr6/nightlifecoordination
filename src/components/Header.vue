<template>
  <v-toolbar fixed class="cyan" dark>
    <v-toolbar-title class="mr-4">
      <span
        class="home"
        @click="navigateTo({name: 'root'})">
        NightLife Coordination
      </span>
    </v-toolbar-title>
    <v-spacer></v-spacer>
    <v-toolbar-items>
      <v-btn 
        v-if="!$store.state.isUserLoggedIn"
        flat 
        dark
        @click="navigateTo({name: 'login'})">
        Login
      </v-btn>
      <v-btn 
        v-if="!$store.state.isUserLoggedIn"
        flat 
        dark
        @click="navigateTo({name: 'register'})">
        Sign Up
      </v-btn>
      <v-btn 
        v-if="$store.state.isUserLoggedIn"
        flat 
        dark
        @click="logout">
        Log out
      </v-btn>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import AuthenticationService from '@/services/AuthenticationService'
export default {
  methods: {
    navigateTo (route) {
      this.$router.push(route)
    },
    async logout () {
      this.$store.dispatch('setUser', null)
      this.$router.push({
        name: 'root'
      })
      try {
        await AuthenticationService.logout()
      } catch (error) {
        this.error = error.response.data.error
      }
    }
  }
}
</script>

<style lang="css" scoped>
.home {
  cursor: pointer;
}
</style>
