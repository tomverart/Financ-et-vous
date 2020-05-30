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
        <tr v-for="report in reportsList" :key="report.idnotefrais">
          <td @click="reportView(report.idnotefrais)">
            <router-link :to="{ path : 'dashboard', query : { id : report.idnotefrais }}">{{ report.libelle }}</router-link> 
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
  name: "ListExpenseReports",
  data() {
    return {
      selectedReport: null
    };
  },
  props: {
    reportsList: null,
  },
  methods:{
    async reportView () {
      this.$emit("reportViewed")
    }
  }
};
</script>
