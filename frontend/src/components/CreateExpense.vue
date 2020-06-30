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

    <form v-on:submit.prevent="onSubmit" id="form">
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
              <button class="btn btn-primary" :disabled="!onExpenseAdd" @click="onSubmit">Ajouter</button>
            </td>&nbsp;
            <td>
              <button :disabled="!onExpenseAdd" @click="done()">Terminer</button>
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
    /*     onExpenseAdd: null,

 */

    onExpenseAdd: null,
    addSuccess: null,
    idnotefraisprops: {
      type: Number,
      required: true
    }
  },
  watch: {
    onExpenseAdd: function() {
      if (!this.onExpenseAdd) {   //si le formulaire est désactivé
        //vider les champs
        this.montantFrais = 0;
        this.descFrais = "";
        document.getElementById("file").value = "";
      }
    }
  },
  data() {
    return {
      file: null,
      descFrais: "",
      montantFrais: 0,
      idnotefrais: this.idnotefraisprops,
      fraisSup: []
      // Merci de ne pas supprimer ça, je le ferais bientôt
      // image: "http://localhost:3000/downloadImage"
    };
  },
  methods: {
    // Envoie des données renseignées pour la création de frais
    async sendData() {
      // Récupère les données du form
      let formData = {};
      formData.file = this.file;
      formData.idnotefrais = this.idnotefrais;
      formData.montantfrais = this.montantFrais;
      formData.descfrais = this.descFrais;

      this.$emit("expenseAdded", formData);

      if (this.addSuccess) {
        //notification "bien ajouté"

        //vide les champs du formulaire
        this.montantFrais = 0;
        this.descFrais = "";
        document.getElementById("file").value = "";
      } else {
        //notification d'erreur de formulaire
      }
      /* 
        
        if (addFrais) {
          
          console.log("bien ajouté");
        } else {
          this.onExpenseAdd = true;
        }
      } else {
        //notification d'erreur de formulaire
        console.log("erreur")
      } */

      /* // Si le bouton "Valider et ajouter un autre frais" est cliqué
      if (addFrais) {
        // Ajoute ce composant en composant supplémentaire
        // TODO : Virer le tableau.
                    //this.fraisSup.push(createExpensesComponent);
        // Désactive les champs et boutons du composant actuel
        this.onExpenseAdd = false;
      } else {
        //this.$router.push("/dashboard");
        this.onExpenseAdd = true;
      } */
    },
    done() {
      this.$emit("doneExpenseAdd");

      // vide les champs du formulaire
      this.montantFrais = 0;
      this.descFrais = "";
      document.getElementById("file").value = "";

      //désactive le formulaire de saisie d'un nouveau frais
    },
    // Récupère le fichier téléversé
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },
    // Empêche le changement de page du form
    onSubmit() {
      //vérifier les champs

      this.sendData();
    }
  }
};
</script>