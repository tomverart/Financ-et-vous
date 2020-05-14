<template>
  <div>
    <h3>Notes de frais</h3>
    <table>
      <thead>
        <tr>
          <th>Libellé</th>
          <th>Description</th>
          <th>Date</th>
          <th>Etat</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="report in reportsList" v-bind:key="report.idnotefrais">
          <td>
            <router-link to="#">{{ report.libelle }}</router-link>
          </td>
          <td>{{ report.description }}</td>
          <td>{{ report.date }}</td>
          <td>{{ report.idetatnote }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "ExpenseReportList",
  data() {
    return {};
  },
  props: {
    reportsList: null
  }
};
</script>
