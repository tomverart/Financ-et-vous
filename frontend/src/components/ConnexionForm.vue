<template>
  <table>
    <tr>
      <td>
        <img style="cursor: pointer;" src="../img/logo.png" />
      </td>
    </tr>
    <br />
    <br />
    <tr class="row">
      <td class="col-md-3"></td>
      <td class="col-md-6">
        <b-form v-on:submit.prevent="sendData">
          <label class="sr-only" for="login">Nom d'utilisateur</label>
          <b-input
            id="login"
            v-model="login"
            class="mb-2 mr-sm-2 mb-sm-0"
            placeholder="Nom d'utilisateur"
          ></b-input>
          <br />
          <label class="sr-only" for="password">Mot de passe</label>
          <b-input-group prepend="🔒" class="mb-2 mr-sm-2 mb-sm-0">
            <b-input v-model="password" id="password" placeholder="Mot de passe"></b-input>
          </b-input-group>
          <br />
          <button class="button">
            <span>Connexion</span>
          </button>
        </b-form>
      </td>
      <td class="col-md-3"></td>
    </tr>
  </table>
</template>

<script>
const sha = require('sha256');

export default {
  name: "ConnexionForm",
  data() {
    return {
      login: null,
      password: null,

      SERVER_URL: "http://localhost:3000"
    };
  },
  methods: {
    async sendData() {
      const resp = await this.$axios.post("/utilisateur", {
        login: this.login,
        password: sha(this.password)
      });
      const user = resp.data;

      if (user.stringrole == "Comptable") {
        this.$router.push("/noteFrais");
      } else if (user.stringrole == "Employé") {
        this.$router.push("/dashboard");
      } else if (user.stringrole == "Administrateur") {
        console.log("it's an admin");
      } else {
        console.log("unknown role");
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
table {
  margin-left: auto;
  margin-right: auto;
  margin-top: 5%;
}
template {
  background-color: blue;
}
.button {
  display: inline-block;
  border-radius: 4px;
  background-color: #932929;
  border: none;
  color: rgb(255, 255, 255);
  text-align: center;
  font-size: 21px;
  width: 148px;
  transition: all 0.5s;
  margin: 5px;
}

.button span {
  cursor: pointer;
  display: inline-block;
  position: relative;
  transition: 0.5s;
}

.button span:after {
  content: "\00bb";
  position: absolute;
  opacity: 0;
  top: 0;
  right: -20px;
  transition: 0.5s;
}

.button:hover span {
  padding-right: 25px;
}

.button:hover span:after {
  opacity: 1;
  right: 0;
}
</style>
