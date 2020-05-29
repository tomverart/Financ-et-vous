<template>
  <div class="mx-auto" style="width: 50rem;">
    <h1>Création de note de frais</h1>
    <form v-on:submit.prevent="onSubmit">
      <label for="libelle">Objet</label>
      <input v-model="libelle" style="width: 25rem;" type="text" class="form-control" id="libelle" />

      <br />
      <button class="btn btn-dark">Créer</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "createfrais",
  data() {
    return {
      libelle: ""
    };
  },
  async mounted() {},
  methods: {
    async onSubmit() {
      await this.$axios
        .post("/dashboard/2", {
          label: this.libelle
        })
        .then(response => {
          if (response.status === 200) {
            console.log(response.data.idnotefrais);
            this.$router.push({
              name: "createFrais",
              params: { idnotefraisprops: response.data.idnotefrais }
            });
          }
        });
    }
  }
};
</script>