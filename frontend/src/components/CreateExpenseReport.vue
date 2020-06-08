<template>
  <div class="mx-auto" style="width: 50rem;">
    <h1>Nouvelle note de frais</h1>
    <form v-on:submit.prevent="onSubmit">
      <label for="label">Objet</label>
      <input v-model="label" style="width: 25rem;" type="text" class="form-control" id="label" />
      <label for="reportDescription">Description</label>
      <textarea id="reportDescription" placeholder="ajoutez une description" v-model="description"></textarea>
      <br />
      <button class="btn btn-dark">Créer</button>
    </form>
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
  async mounted() {},
  methods: {
    // Création de la note de frais
    async onSubmit() {
      this.$emit("reportAdded", {
            label: this.label,
            description: this.description
          });
      event.target.reset();

    }
  }
};
</script>
