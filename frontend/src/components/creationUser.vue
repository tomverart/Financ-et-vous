<template>
  <div>
    <!-- Barre de navigation-->
    <b-navbar toggleable="lg" type="light">
      <b-navbar-brand>
        <img style="margin-left:auto; margin-right: auto" src="../img/miniature_fond_fonce.png" />
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <li class="nav-item">
        <button type="button" class="btn btn-primary" @click="clickRoute('/noteFrais')">Notes de frais</button>
      </li>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item>
            <button type="button" class="btn btn-primary" @click="deconnex()">Déconnexion</button>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
    <div class="mx-auto" style="width: 35rem;">
      <label for="login">Login utilisateur</label>
      <input v-model="login" type="text" id="login" class="form-control" />

      <br />
      <label for="password">Password</label>
      <input v-model="password" type="text" id="password" class="form-control" />
      <br />

      <label for="firstName">First Name</label>
      <input v-model="firstName" type="text" id="firstName" class="form-control" />

      <br />

      <label for="lastName">Last Name</label>
      <input v-model="lastName" type="text" id="lastName" class="form-control" />

      <br />

      <div class="form-check">
        <input
          class="form-check-input"
          type="radio"
          id="radioEmploy"
          checked
          value="3"
          v-model="idRole"
        />
        <label class="form-check-label" for="radioEmploy">Employé</label>
      </div>
      <div class="form-check">
        <input class="form-check-input" type="radio" id="radioCompt" value="2" v-model="idRole" />
        <label class="form-check-label" for="radioCompt">Comptable</label>
      </div>
      <br />
      <label for="groupChoice">Groupe</label>
      <select v-model="idusergroup" id="groupChoice" class="form-control">
        <option
          v-for="usergroup in usergrouplist"
          v-bind:key="usergroup.idusergroup"
        >{{ usergroup.stringgroup }}</option>
      </select>
      <br />

      <button class="btn btn-primary" v-on:click="sendData">Créer utilisateur</button>
    </div>
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
      idRole: 3,
      // Choix du select
      idusergroup: 1,

      // Liste des groupes d'employés
      usergrouplist: null
    };
  },
  async mounted() {
    // Récupère la liste des groupes d'employés
    this.usergrouplist = await this.getGroups();
    // Le select affichera en choix par défaut la première entrée de la liste des groupes d'employés
    this.idusergroup = this.usergrouplist[0].stringgroup;
  },
  props: {},
  methods: {
    async sendData() {
      const sha = require("sha256");
      // Récupère l'id du groupe
      let indexGroupList = this.getIdGroup(
        this.usergrouplist,
        "stringgroup",
        this.idusergroup
      );

      await this.$axios
        .post("/createUser", {
          login: this.login,
          password: sha(this.password),
          firstName: this.firstName,
          lastName: this.lastName,
          idRole: this.idRole,
          idgroup: this.usergrouplist[indexGroupList].idgroup
        })
        .then(() => {
          // En cas de réussite, retourne aux valeurs par défaut et affiche un message de confirmation
          this.login = null;
          this.password = null;
          this.firstName = null;
          this.lastName = null;
          window.alert("Utilisateur créé");
        })
        .catch(err => {
          window.alert("ERR : ", err);
          console.log("ERR : ", err);
        });
    },
    // Récupère tous les groupes
    async getGroups() {
      return await this.$axios.get("/getUserGroups").then(response => {
        return response.data;
      });
    },
    // Récupère l'id du groupe, peut être fait plus simplement const index = Data.findIndex(item => item.name === 'John');
    getIdGroup(array, attr, value) {
      for (var i = 0; i < array.length; i += 1) {
        if (array[i][attr] === value) {
          return i;
        }
      }
      return -1;
    },
    // Déconnecter
    async deconnex() {
      await this.$axios.get("/disconected");
      this.$router.push("/login");
    },
    clickRoute(pathToRoute) {
      this.$router.push(pathToRoute);
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>