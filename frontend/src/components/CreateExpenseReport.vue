<template>
  <div class="mx-auto" style="width: 50rem;">
    <h3>Déclarer note de frais</h3>
    <br />
    <div v-if="addSuccess">
      Ajouté avec succès !
      <h4>{{ newReport.titre}}</h4>
      <p>{{ newReport.description }}</p>
      <button v-on:click="onExpenseAddition">ajouter un frais</button>
    </div>
    <div v-else>
      <form v-on:submit.prevent="onSubmit">
        <div class="form-group">
          <label for="label">Titre</label>
          <input
            v-model="label"
            style="width: 50%;"
            type="text"
            class="form-control"
            id="label"
            required
          />
        </div>
        <div class="form-group">
          <label for="reportDescription">Description</label>
          <textarea
            class="form-control"
            rows="4"
            id="reportDescription"
            placeholder="ajoutez une description"
            v-model="description"
            required
          ></textarea>
          <br />
        </div>
        <div class="form-group">
          <button class="btn btn-dark">Créer</button>
        </div>
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
  },
  methods: {
    // Création de la note de frais
    onSubmit() {
      this.$emit("reportAdded", {
        label: this.label,
        description: this.description
      });
      event.target.reset();
    },
    onExpenseAddition() {
      this.$emit("expenseAddRequested");
    }
  }
};
</script>
