<template>
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

    <label for="idRole">id Role</label>
    <input v-model="idRole" type="text" id="idRole" class="form-control" />
    <br />

    <select v-model="idusergroup">
      <option
        v-for="usergroup in usergrouplist"
        v-bind:key="usergroup.idusergroup"
      >{{ usergroup.stringgroup }}</option>
    </select>

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
      // Récupère l'id du groupe
      let indexGroupList = this.getIdGroup(
        this.usergrouplist,
        "stringgroup",
        this.idusergroup
      );

      await this.$axios.post("/createUser", {
        login: this.login,
        password: this.password,
        firstName: this.firstName,
        lastName: this.lastName,
        idRole: this.idRole,
        idgroup: this.usergrouplist[indexGroupList].idgroup
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
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>