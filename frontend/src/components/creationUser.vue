<template>
  <div class="mx-auto" style="width: 35rem;">
    <label for="login">Creation d'un utilisateur</label>
    <input v-model="login" type="text" id="login" class="form-control" />

    <br />
    <label for="password">Password</label>
    <input v-model="password" type="text" id="password" class="form-control" />
    <br />

    <label for="firstName">First Name </label>
    <input v-model="firstName" type="text" id="firstName" class="form-control" />

    <br /> 

    <label for="lastName">Last Name </label>
    <input v-model="lastName" type="text" id="lastName" class="form-control" />

    <br /> 

    <label for="idRole">id Role </label>
    <input v-model="idRole" type="text" id="idRole" class="form-control" /> 

    <button class="btn btn-primary" v-on:click="sendData">envoyer donnée</button>
  </div>
</template>


<script>

// faire un bouton radio pour le choix du role comptable / employe 
export default {
  name: "CreationForm",
  data() {
    return {
      login: null,
      password: null,
      firstName: null,
      lastName: null,
      idRole: null,

      SERVER_URL: "http://localhost:3000"
    };
  },
  props: {},
  methods: {
    async sendData() {
      const resp = await this.$axios.post("/createUser", {
        login: this.login,
        password: this.password,
        firstName: this.firstName,
        lastName: this.lastName,
        idRole: this.idRole
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>