<template>
  <div id="theContainer">
    <div>
      <b-table
        class="b-table"
        ref="selectableTable"
        selectable
        :select-mode="selectMode"
        id="list"
        :items="reports"
        :fields="fields"
        :busy="aya"
        sort-icon-left
        responsive
        hover
        :no-border-collapse="true"
        sticky-header
        @row-clicked="openDetails"
      >
        <!--Customed culumn "Libelle"-->
        <template v-slot:head(libelle)="data">
          <span>{{ data.label.toUpperCase() }}</span>
        </template>

        <!--Customed culumn "Date"-->
        <template v-slot:head(date)="data">
          <span>{{ data.label.toUpperCase() }}</span>
        </template>

        <!--Customed culumn "Etat"-->
        <template v-slot:head(etat)="data">
          <span class="text-info">{{ data.label.toUpperCase() }}</span>
        </template>

        <!--Customed culumn "Montant"-->
        <template v-slot:head(montant)="data">
          <span class="text-info">{{ data.label.toUpperCase() }}</span>
        </template>

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
          <b-card>
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

            <b-button size="sm" @click="showReport(row)">Ouvrir</b-button>
            <b-button size="sm" @click="deleteReport(row)">Supprimer</b-button>
            <b-button size="sm" @click="modifyReport(row)">Modifier</b-button>
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
  mounted() {
    console.log(this.reports);
  },
  computed: {
    currentUrl: function() {
      return this.$router.history.current.fullPath;
    },
    reports: function() {
      var them = [];

      if (this.reportsList) {
        this.reportsList.forEach(report => {
          var state = report.idetatnote;

          if (report.idetatnote === 1) {
            state = "En attente";
          } else if (report.idetatnote === 2) {
            state = "Acceptée";
          } else if (report.idetatnote === 3) {
            state = "Refusée";
          } else {
            state = "Non défini";
          }

          them.push({
            libelle: report.libelle,
            date: report.date,
            etat: state,
            montant: report.montant
          });
        });
      }
      return them;
    }
  },
  props: {
    reportsList: null,
    reportToShow: null
  },
  methods: {
    async reportView(id) {
      if (this.currentUrl !== "/dashboard?id=" + id)
        this.$router.push("/dashboard?id=" + id);
      this.$emit("reportViewed");
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
      this.reportsList.forEach(report => {
        if (report.libelle === row.item.libelle) id = report.idnotefrais;
      });
      if (id) {
          this.$emit("reportModified", id);
      } else console.log("impossible d'ouvrir cettre nf");
    },
    deleteReport(row) {
      //récupération de l'id de la NF en question
      let id;
      this.reportsList.forEach(report => {
        if (report.libelle === row.item.libelle) id = report.idnotefrais;
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

      this.reportsList.forEach(report => {
        if (row.item.libelle === report.libelle) id = report.idnotefrais;
      });

      if (id) this.$emit("reportViewed", id);
    }
  }
};
</script>

<style scoped>
/*#theList {
  height: 800px;

}*/
#theContainer {
  height: 400px;
} /*
.b-table-simple {
  background-color: red;
  
}*/
.b-table {
  margin: 0 auto;
  /* background-color: rgb(179, 157, 128); */
}
.b-table-sticky-header {
  max-height: 450px;
} /*
/*b-table-simple {
  max-height: 100%;
  background-color: blue;
}
  /*
#theList b-table {
  width: 100%;
 }
#theList b-table b-tbody {
  width: 100%;
 }
#theList b-table b-tbody b-tr {
  width: 100%;
 }*/
</style>