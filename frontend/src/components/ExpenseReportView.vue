<template>
  <div>
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
    <div v-else>
      <table>
        <tr>
          <td>
            <h2>{{ reportToDisplay.libelle }}</h2>
          </td>
          <td>
            <button @click="onModify = true">Modifier</button>
          </td>
          <td>
            <button @click="deletion">Supprimer</button>
          </td>
        </tr>
      </table>
      <h5>Description : {{ reportToDisplay.description }}</h5>
      <div>(ici prochainement les frais lié à cette NF)</div>
    </div>
    <button @click="hiding">fermer</button>
  </div>
</template>

<script>
export default {
  name: "ExpenseReportView",
  data() {
    return {
      onModify: false,
      newLabel: null,
      newDescription: null
    };
  },
  props: {
    reportToDisplay: {},
   // done: null
    /*,
        notes: []*/
  },/*
  watch: {
    done: function() {
      if (this.done) this.onModify = false;
    }
  },*/
  methods: {
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