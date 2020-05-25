<template>
  <div>
    <table>
      <tr>
        <td>
          <h2 v-if="reportToDisplay">{{ reportToDisplay.libelle }}</h2>
        </td>
        <td>
          <button>Modifier</button>
        </td>
        <td>
          <button @click="deletion">Supprimer</button>
        </td>
      </tr>
    </table>
    <h5>Description : {{ reportToDisplay.description }}</h5>
    <div>(ici prochainement les frais lié à cette NF)</div>
  </div>
</template>

<script>
export default {
  name: "ExpenseReportView",
  props: {
    reportToDisplay: {} /*,
        notes: []*/
  }, 
  methods: {
      deletion () {
      this.$emit("reportDeleted")
    },
  }
};
</script>