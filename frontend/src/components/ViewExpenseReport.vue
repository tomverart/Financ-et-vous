<template>
  <div>
    <div v-if="onReportView">
      <div v-if="onModify">
        <h3>Modification</h3>
        <form @submit.prevent="modification">
          <label for="reportLabel">Libellé</label>
          <input id="reportLabel" type="text" v-model="reportToDisplay.libelle" />
          <br />
          <label for="reportDescription">Description</label>
          <textarea id="reportDescription" v-model="reportToDisplay.description"></textarea>
          <input type="submit" value="Enregistrer" />
        </form>
      </div>

      <table v-else>
        <tr>
          <td>
            <h2>{{ reportToDisplay.libelle }}</h2>
          </td>
          
          <td v-if="isComptable != true" style="padding-right: 2rem; padding-left:2rem;">
            <button @click="onModify = true" class="myButton">Modifier</button>
          </td>
          <td v-if="isComptable != true" >
            <button @click="deletion" class="myButton">Supprimer</button>
          </td>
        </tr>
      </table>
      <h5>Description : {{ reportToDisplay.description }}</h5>
      <div v-for="frais in expensesList" :key="frais.idfrais">
        <table class="table">
          <tr>{{frais.montantfrais}}€</tr>
          <tr>{{frais.descriptionfrais}}</tr>
          <tr>
            <img
              style="max-width: 30rem; max-height: 30rem;"
              :src="image + frais.fichierfrais"
              alt="imageFrais"
            />
          </tr>
        </table>
      </div>
    </div>
    <button @click="hiding" class="myButton">fermer</button>
  </div>
</template>

<script>
export default {
  name: "ViewExpenseReport",
  data() {
    return {    
      onReportView: true,
      onModify: false,
      // Liste des frais à afficher
      expensesList: null,
      // Sauvegarde la note affichée pour vérifier la nécessité de mise à jour des données
      reportCheck: null,
      // Lien de récupération d'images
      image: "http://localhost:3000/downloadImage/",
      isComptable: this.comptable
    };
  },
  props: {
    reportToDisplay: {},
    comptable: null
  },
  mounted() {
    this.getFrais();
    this.reportCheck = this.$route.query.id;
  },
  async beforeUpdate() {
    // Met à jour les frais si nécessaire
    if (this.reportCheck !== this.$route.query.id) {
      this.getFrais();
      this.reportCheck = this.$route.query.id;
    }
  },
  methods: {
    // Récupère les frais de la note pour les ajouter à la liste des frais
    async getFrais() {
      await this.$axios
        .post("/getAllExpenses", {
          idnotefrais: this.$route.query.id
        })
        .then(response => {
          this.expensesList = response.data;
        });
    },
    deletion() {
      this.$emit("reportDeleted");
    },
    modification() {
      this.$emit("reportModified", this.reportToDisplay);
      this.onModify = false;
    },
    hiding() {
      this.$emit("hide");
    }
  }
};
</script>