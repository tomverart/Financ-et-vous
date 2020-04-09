<template>
  <div>
    <connexion-form v-on:log="connexion"/> 
  </div>
</template>

<script>
import ConnexionForm from './components/ConnexionForm.vue'

export default {
  name: 'App',
  components: {
    ConnexionForm
  },
  methods: {
    connexion(logs) {
      console.log(logs.Login, logs.Password);
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
