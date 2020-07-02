<template>
  <div id="theContainer">
    <div>
      <b-table
        class="b-table table-hover"
        ref="selectableTable"
        selectable
        :select-mode="selectMode"
        id="list"
        :items="reports"
        :fields="fields"
        :busy="aya"
        sort-icon-left
        responsive
        :no-border-collapse="true"
        sticky-header
        @row-clicked="openDetails"
      >
        <!--Customed culumn "Libelle"-->
        <template v-slot:head(libelle)="data">
          <span style="color: #932929">{{ data.label.toUpperCase() }}</span>
        </template>

        <!--Customed culumn "Date"-->
        <template v-slot:head(date)="data">
          <span style="color: #932929">{{ data.label.toUpperCase() }}</span>
        </template>

        <!--Customed culumn "Etat"-->
        <template v-slot:head(etat)="data">
          <span style="color: #932929">{{ data.label.toUpperCase() }}</span>
        </template>

        <!--Customed culumn "Montant"-->
        <template v-slot:head(montant)="data">
          <span style="color: #932929">{{ data.label.toUpperCase() }}</span>
        </template>

        <!-- NE PAS SUPPRIMER  -->
        <!--Customed culumn "Select" culumn of checkboxes-->
        <!--     <template v-slot:cell(select)="{ rowSelected }">
        <template v-if="rowSelected">-->
        <!--             <span aria-hidden="true">&check;</span>
        -->
        <!-- <span class="sr-only">Selected</span> -->
        <!--  </template>
          <template v-else>
            <span aria-hidden="true">&nbsp;</span>
            <span class="sr-only">Not selected</span>
          </template>
        </template>-->

        <!--Details revealed after selection of an expense report on the list-->
        <template v-slot:row-details="row">
          <b-card style="background-color: #ddd9cf">
            <b-row class="mb-2">
              <b-col sm="3" class="text-sm-right">
                <b>Montant:</b>
              </b-col>
              <b-col>{{ row.item.montant }}</b-col>
            </b-row>

            <b-row class="mb-2">
              <b-col sm="3" class="text-sm-right">
                <b>Etat:</b>
              </b-col>

              <b-col>{{ row.item.etat }}</b-col>
            </b-row>

            <b-button class="myButton" size="sm" @click="showReport(row)">Ouvrir</b-button>
            <b-button class="myButton" size="sm" @click="deleteReport(row)">Supprimer</b-button>
            <b-button class="myButton" size="sm" @click="modifyReport(row)">Modifier</b-button>
          </b-card>
        </template>
      </b-table>
    </div>
  </div>
</template>

<script>
export default {
  name: "ListExpenseReports",
  data() {
    return {
      aya: false,
      reportToDisplay: null,
      fields: [
        { key: "libelle", label: "libelle", sortable: true },
        { key: "date", label: "date", sortable: true },
        { key: "etat", label: "etat", sortable: true },
        { key: "montant", label: "montant", sortable: true }
      ],
      selectMode: "range"
    };
  },
  mounted() {},
  computed: {
    currentUrl: function() {
      return this.$router.history.current.fullPath;
    },
    reports: function() {
      var them = [];

      if (this.reportsList) {
        this.reportsList.forEach(reportAndExpenses => {
          var state = reportAndExpenses.report.idetatnote;

          if (reportAndExpenses.report.idetatnote === 1) {
            state = "En attente";
          } else if (reportAndExpenses.report.idetatnote === 2) {
            state = "Acceptée";
          } else if (reportAndExpenses.report.idetatnote === 3) {
            state = "Refusée";
          } else {
            state = "Non défini";
          }

          //montant total de cette  NF
          let amount = 0;
          for (let i = 0; i < reportAndExpenses.expenses.length; i++) {
            amount += Number(reportAndExpenses.expenses[i].montantfrais);
          }

          them.push({
            libelle: reportAndExpenses.report.libelle,
            date: reportAndExpenses.report.date,
            etat: state,
            montant: amount + " €"
          });
        });
      }
      return them;
    }
  },
  props: {
    reportsList: null, //==> [  {  report: {} , expenses: []   }  ]
    reportToShow: null
  },
  methods: {
    async reportView(id) {
      this.$emit("reportViewed", id);
    },
    unselectOtherRows(selectedOne) {
      let reportsRows = this.$refs.selectableTable.items;

      reportsRows.forEach(row => {
        if (row.libelle !== selectedOne.libelle) {
          row._showDetails = false;
        }
      });
    },
    openDetails(reportRow) {
      this.unselectOtherRows(reportRow);
      reportRow._showDetails = !reportRow._showDetails;
    },
    modifyReport(row) {
      //récupération de l'id de la NF en question
      let id;
      this.reportsList.forEach(reportAndExpenses => {
        if (reportAndExpenses.report.libelle === row.item.libelle)
          id = reportAndExpenses.report.idnotefrais;
      });
      if (id) {
        this.$emit("reportModified", id);
      } else console.log("impossible d'ouvrir cettre nf");
    },
    deleteReport(row) {
      //récupération de l'id de la NF en question
      let id;
      this.reportsList.forEach(reportAndExpenses => {
        if (reportAndExpenses.report.libelle === row.item.libelle)
          id = reportAndExpenses.report.idnotefrais;
      });
      if (id) {
        if (
          confirm(
            'Etes-vous sur de vouloir supprimer la note de frais "' +
              row.item.libelle +
              '"?'
          )
        ) {
          this.$emit("reportDeleted", id);
        }
      } else console.log("impossible de supprimer cettre nf");
    },
    showReport(row) {
      let id;

      this.reportsList.forEach(reportAndExpenses => {
        if (row.item.libelle === reportAndExpenses.report.libelle)
          id = reportAndExpenses.report.idnotefrais;
      });

      if (id) this.$emit("reportViewed", id);
    }
  }
};
</script>

<style scoped>
#theContainer {
  height: 400px;
}

.b-table {
  margin: 0 auto;
}

.b-table-sticky-header {
  max-height: 450px;
}
.myButton {
  background-color: #932929;
  border: 0px solid #932929;
  color: #ffffff;
  font-weight: bold;
  font-size: 15px;
  border-radius: 8%;
  margin: 4px;
}
</style>
