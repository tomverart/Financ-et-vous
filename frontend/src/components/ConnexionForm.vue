<template>
  <div class="mx-auto" style="width: 35rem;">
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
      const resp = await this.$axios.post("/utilisateur", {
        login: this.login,
        password: this.password
      });
      const user = resp.data;
      
      if (user.stringrole == "Comptable") {   //pensre a mettre des utilisateurs dans la BDD avec comme role comptable et employe
        this.$router.push("/dashboard");
      } else {
        console.log('vous etes ici')
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
