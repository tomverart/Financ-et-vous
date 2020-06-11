<template>
  <div>
    <h3>Notes de frais</h3>
    <b-table-simple hover id="list" responsive>
     
      <b-thead>
        <b-tr>
          <b-th>Libellé</b-th>
          <b-th>Date</b-th>
          <b-th>Etat</b-th>
          <b-th>Montant</b-th>
        </b-tr>
      </b-thead>
      <b-tbody>
        <b-tr v-for="report in reportsList" :key="report.idnotefrais">
          <b-td @click="reportView(report.idnotefrais)">{{ report.libelle }}</b-td>
          <b-td @click="reportView(report.idnotefrais)">{{ report.date }}</b-td>
          <b-td @click="reportView(report.idnotefrais)">{{ report.idetatnote }}</b-td>
          <b-td>à calculer</b-td>
        </b-tr>
      </b-tbody>
      <b-tfoot>
      <b-tr>
        <b-td>Total: </b-td>
      </b-tr>
      </b-tfoot>
    </b-table-simple>
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
  computed: {
    currentUrl: function(){
      return this.$router.history.current.fullPath;
    }
  },
  props: {
    reportsList: null
  },
  methods: {
    async reportView(id) {
      if(this.currentUrl !== "/dashboard?id=" + id)
        this.$router.push("/dashboard?id=" + id);
      this.$emit("reportViewed");
    }
  }
};
</script>

<style scoped>
/*#list {
  border-collapse: collapse;
}
#list b-th {
  padding-top: 12px;
  padding-bottom: 12px;
  text-align: left;
  background-color: #932929;
  color: white;
}
#list b-td,
#list b-th {
  border: 1px solid #932929;
  padding: 8px;
}
#list b-tr {
  background-color: #f2f2f2;
}

#list b-tr:hover {
  cursor: pointer;
}*/
</style>