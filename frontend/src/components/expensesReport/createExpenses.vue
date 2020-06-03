<template>
  <div class="mx-auto" style="width: 50rem;">
    <!-- Merci de ne pas supprimer ça, je le ferais bientôt -->
    <!-- <h1>Frais</h1>
    <span v-if="image === null">chargement...</span>
    <span v-else>
    <img style="max-width: 30rem; max-height: 30rem;" :src="image" alt="Base64 encoded image" />
    </span>-->

    <!-- Composant supplémentaire -->
    <button class="btn btn-primary" @click="clickRoute('/dashboard')">Retour au tableau de bord</button>

    <div v-for="(fraisAdd, index) in fraisSup" :key="index">
      <component :is="fraisAdd" :idnotefraisprops="idnotefrais" />
    </div>
    <br />
    <form v-on:submit.prevent="onSubmit">
      <label for="montantfrais">Montant</label>
      <input
        :disabled="validatedExpense"
        v-model="montantFrais"
        type="number"
        id="montantfrais"
        class="form-control"
        style="max-width: 5rem"
      />
      <br />
      <label for="descFrais">Description</label>
      <textarea
        v-model="descFrais"
        type="text"
        id="descFrais"
        class="form-control"
        :disabled="validatedExpense"
      />

      <br />
      <label for="file">Photo</label>
      <br />
      <input
        id="file"
        type="file"
        ref="file"
        v-on:change="handleFileUpload()"
        :disabled="validatedExpense"
      />

      <br />
      <br />
      <button
        class="btn btn-primary"
        v-on:click="sendData(false)"
        :disabled="validatedExpense"
      >Valider</button>
      &nbsp;
      <button
        class="btn btn-primary"
        v-on:click="sendData(true)"
        :disabled="validatedExpense"
      >Valider et ajouter un autre frais</button>
    </form>
  </div>
</template>

<script>
import createExpensesComponent from "./createExpenses.vue";

export default {
  name: "viewfrais",
  components: {
    createExpensesComponent
  },
  props: {
    idnotefraisprops: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      file: null,
      descFrais: "",
      montantFrais: 0,
      idnotefrais: this.idnotefraisprops,
      fraisSup: [],
      validatedExpense: false
      // Merci de ne pas supprimer ça, je le ferais bientôt
      // image: "http://localhost:3000/downloadImage"
    };
  },
  mounted() {},
  methods: {
    // Envoie des données renseignées pour la création de frais
    async sendData(addFrais) {
      // Récupère les données du form
      let formData = new FormData();

      formData.append("file", this.file);
      formData.append("idnotefrais", this.idnotefrais);
      formData.append("montantfrais", this.montantFrais);
      formData.append("descfrais", this.descFrais);

      // Crée le frais
      await this.$axios
        .post("/uploadImage", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(function() {
          console.log("success");
        })
        .catch(function() {
          console.log("failure");
        });

      // Si le bouton "Valider et ajouter un autre frais" est cliqué
      if (addFrais) {
        // Ajoute ce composant en composant supplémentaire
        // TODO : Virer le tableau.
        this.fraisSup.push(createExpensesComponent);
        // Désactive les champs et boutons du composant actuel
        this.validatedExpense = true;
      }
      else{
        this.$router.push('/dashboard');
      }
    },
    // Récupère le fichier téléversé
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },
    // Empêche le changement de page du form
    onSubmit() {
      // console.log("prevent");
    },
    clickRoute(pathToRoute) {
      this.$router.push(pathToRoute);
    }
  }
};
</script>