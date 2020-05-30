expenseForm

<template>
  <div>
    <h3>Nouvelle note de frais</h3>
    <form @submit.prevent="reportAddition">
      <label for="reportLabel">Libellé</label>
      <input id="reportLabel" type="text" v-model="label" /> <br />
      <label for="reportDescription">Description</label>
      <textarea id="reportDescription" placeholder="ajoutez une description" v-model="description"></textarea>
      <input type="submit" value="Ajouter" />
    </form>
  </div>
</template>

<script>
export default {
  name: "CreateExpenseReport",
  data() {
    return {
      label: null,
      description: null
    };
  },
  methods: {
    reportAddition(event) {
      event.target.reset();
      this.$emit("reportAdded", {
            label: this.label,
            description: this.description
          });
    }
  }
};
</script> 

