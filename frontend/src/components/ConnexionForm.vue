<template>
  <div>
    <label for="login">Login</label>
    <input v-model="login" type="text" id="login" class="form-control" />

    <br />
    <label for="password">Password</label>
    <input v-model="password" type="text" id="password" class="form-control" />
    <br />
    <button class="btn btn-primary" v-on:click="sendData">envoyer donnée</button>
  </div>
</template>

<script>
export default {
  name: "ConnexionForm",
  data() {
    return {
      login: null,
      password: null,

      SERVER_URL: "http://localhost:3000"
    };
  },
  props: {},
  methods: {
    async sendData() {
      const user = await fetch(`${this.SERVER_URL}/utilisateur`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          login: this.login,
          password: this.password
        })
      })
        .then(resp => {
          
          return resp.json();
        })
        .then(data => {
          return data;
        });

        user;

//     this.$router.push / replace?("/login");

        
    }
  }
};
</script>
// 
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
