<template>
  <div class="mx-auto">
    <h5>Déclarer note de frais</h5>

    <div v-if="addSuccess">
      Nouvelle note de frais créée.
      <h4>{{ newReport.titre}}</h4>
      <p>{{ newReport.description }}</p>
      <button :disabled="!onExpenseAdd" @click="confirmAdd(true)">Enregistrer</button>
      <button @click="confirmAdd(false)">Abandonner</button>
    </div>

    <div v-else>
      <form v-on:submit.prevent="onSubmit">
        <b-row class="my-1">
          <b-col sm>
            <input
              v-model="label"
              style="width: 50%;"
              type="text"
              class="form-control"
              id="label"
              placeholder="Titre"
              required
            />
          </b-col>
        </b-row>

        <b-row class="my-1">
          <b-col md>
            <textarea
              class="form-control"
              rows="2"
              id="reportDescription"
              placeholder="Ajoutez une description"
              v-model="description"
              required
            ></textarea>
          </b-col>
        </b-row>

        <b-row class="my-1">
          <b-col md>
            <button class="btn btn-dark">Créer</button>
          </b-col>
        </b-row>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "createExpenses",
  data() {
    return {
      label: "",
      description: null
    };
  },
  props: {
    addSuccess: null,
    newReport: null,
    onExpenseAdd: null
  },
  methods: {
    // Création de la note de frais
    onSubmit() {
      this.$emit("reportAdded", {
        label: this.label,
        description: this.description
      });
    },
    confirmAdd(confirmation) {
      if (confirmation) {
        //notification "note de frais enregistrée"
      } else {
        //notification "déclaration annulée"
        //suppression de note de frais previously ajouté (pas la meilleure façon de faire mais bon..)
        this.$emit("abandonAdd", this.newReport.idnotefrais);
      }
    }
  }
};
</script>
