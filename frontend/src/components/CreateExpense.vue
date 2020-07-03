<template>
  <!-- <div class="mx-auto"> -->
  <b-card>
    <!-- Merci de ne pas supprimer ça, je le ferais bientôt -->
    <!-- <h1>Frais</h1>
    <span v-if="image === null">chargement...</span>
    <span v-else>
    <img style="max-width: 30rem; max-height: 30rem;" :src="image" alt="Base64 encoded image" />
    </span>-->

    <!-- <div v-for="(fraisAdd, index) in fraisSup" :key="index">
      <component
        :is="fraisAdd"
        :idnotefraisprops="idnotefrais"
        @reportValidated="returnToExpensesReport"
      />
    </div>-->
    <h5>Ajouter une dépense</h5>

    <form v-on:submit.prevent="sendData" id="form">
      <div class="table-responsive">
        <table>
          <tr>
            <td>
              <label for="montantfrais">Montant</label>
            </td>
            <td>
              <input
                :disabled="!onExpenseAdd"
                v-model="montantFrais"
                type="number"
                id="montantfrais"
                class="form-control"
                style="max-width: 5rem"
              />
            </td>
          </tr>

          <tr>
            <td>
              <label for="descFrais">Description</label>
            </td>
            <td>
              <textarea
                v-model="descFrais"
                type="text"
                id="descFrais"
                class="form-control"
                :disabled="!onExpenseAdd"
              />
            </td>
          </tr>

          <tr>
            <td>
              <label for="file">Justificatif</label>
            </td>
            <td>
              <input
                id="file"
                type="file"
                ref="file"
                v-on:change="handleFileUpload()"
                :disabled="!onExpenseAdd"
              />
            </td>
          </tr>

          <tr>
            <td>
              <button class="myButton" :disabled="!onExpenseAdd" @click="terminate = false">Ajouter</button>
            </td>&nbsp;
            <td>
              <button :disabled="!onExpenseAdd" @click="terminate = true" class="myButton">Terminer</button>
            </td>
          </tr>
        </table>
      </div>
    </form>
  </b-card>
</template>

<script>
//import createExpensesComponent from "./CreateExpense.vue";

export default {
  name: "createExpense",
  /* components: {
    createExpensesComponent
  }, */
  props: {
    onExpenseAdd: null,
    addSuccess: null,
    idnotefraisprops: {
      type: Number,
      required: true
    }
  },
  watch: {
    onExpenseAdd: function() {    //si on est en train d'ajouter un frais
      if (!this.onExpenseAdd) {
        //vider les champs
        this.resetForm();
      }
    },
    addSuccess: function() {    
      if (this.addSuccess) {
        //si l'ajout de frais a bien été pris en compte

        //vide les champs du formulaire
        this.resetForm();
      } else {
        //notification d'erreur de formulaire d'ajout de frais
      }
    }
  },
  data() {
    return {
      file: null,
      descFrais: "",
      montantFrais: 0,
      idnotefrais: this.idnotefraisprops,
      fraisSup: [],
      terminate: null
      // Merci de ne pas supprimer ça, je le ferais bientôt
      // image: "http://localhost:3000/downloadImage"
    };
  },
  methods: {
    resetForm() {
      this.montantFrais = 0;
      this.descFrais = "";
      document.getElementById("file").value = "";
    },
    // Envoie des données renseignées pour la création de frais
    async sendData() {
      if (this.terminate) {
        //click sur terminer
        this.done();
      } else {
        //click sur ajouter
        // Récupère les données du form
        let formData = {};
        formData.file = this.file;
        formData.idnotefrais = this.idnotefraisprops;
        formData.montantfrais = this.montantFrais;
        formData.descfrais = this.descFrais;

        this.$emit("expenseAdded", formData);
      }
    },
    done() {
      this.$emit("doneExpenseAdd");

      // vide les champs du formulaire
      this.resetForm();
    },
    handleFileUpload() {     // Récupère le fichier téléversé
      this.file = this.$refs.file.files[0];
    }
  }
};
</script>

<style>
.myButton {
  /* background-color: #11ffee00;  couleur transaparente*/
  background-color: #932929;
  border: 0px solid #932929;
  color: #ffffff;
  font-weight: bold;
  font-size: 15px;
  border-radius: 8%;
}
</style>
