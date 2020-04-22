<template>
  <div>
      <label for="login">Login</label>
      <input v-model="login" type="text" id="login" class="form-control"/>

      <br/>
      <label for="password">Password</label>
      <input v-model="password" type="text" id="password" class="form-control">
      <br/>
      <button class="btn btn-primary" v-on:click="sendData">envoyer donnée</button>
  </div>
</template>

<script>
export default {
  name: 'ConnexionForm',
  data() {
      return {
        login: null,
        password: null
      }
  },
  props: {
  },
  methods: {
      sendData(){
          this.$emit('log',
           { Login: this.login,
             Password: this.password
           });
           this.login = null;
           this.password = null; 
      }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
