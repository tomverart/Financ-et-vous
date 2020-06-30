<template>
  <div>
    <!-- Barre de navigation-->
    <b-navbar toggleable="lg" type="light">
      <b-navbar-brand>
        <img style="margin-left:auto; margin-right: auto" src="../img/miniature_fond_fonce.png" />
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">
          <b-nav-item>
            <a href style="color: white">Déconnexion</a>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <!--Ajout de notes de frais-->
    <div id="newReport">
      <b-card>
        <b-row align-h="center">
          <b-col sm>
            <!--Création note de frais-->
            <CreateExpenseReport
              :addSuccess="reportAdded"
              :newReport="reportOnAdd"
              :onExpenseAdd="doneExpenseAdd"
              @reportAdded="reportAddition"
              @abandonAdd="reportDeletion"
            />
          </b-col>

          <!--Création de frais-->
          <b-col sm>
            <CreateExpense
              :onExpenseAdd="onExpenseAdd"
              :addSuccess="expenseAdded"
              :idnotefraisprops="reportOnAdd.idnotefrais"
              @expenseAdded="expenseAddition"
              @reportValidated="reportValidateExpense"
              @doneExpenseAdd="finishExpenseAdd"
            />
          </b-col>
        </b-row>
      </b-card>
    </div>
    <br />

    <!--Liste des notes de frais-->
    <div id="list">
      <ListExpenseReports :reportsList="reports" @reportViewed="reportDisplay" />
    </div>

    <!--Fenêtre de visualisation d'une note de frais-->
    <div v-if="reportToShow">
      <b-modal id="report-on-modal" hide-footer no-close-on-backdrop>
        <template v-slot:modal-title>{{ reportToShow.libelle }}</template>

        <div class="d-block text-center">{{ reportToShow.description }}</div>

        <b-button class="mt-3" block @click="$bvModal.hide('report-on-modal')">Fermer</b-button>
      </b-modal>
    </div>
  </div>
</template>

<script>
import ListExpenseReports from "./ListExpenseReports";
import CreateExpenseReport from "./CreateExpenseReport";
import CreateExpense from "./CreateExpense";
/* import ViewExpenseReport from "./ViewExpenseReport";
 */ import axios from "axios";

export default {
  name: "EmployeeDashboard",
  components: {
    CreateExpenseReport,
    CreateExpense,
    ListExpenseReports
    /* ViewExpenseReport */
  },
  data() {
    return {
      reports: null,
      reportToShow: null,
      //onListView: true,
      onExpenseAdd: false,
      reportAdded: false,
      expenseAdded: false,
      doneExpenseAdd: false,
      reportOnAdd: {
        idnotefrais: 0
      }
      //onReportView: false
    };
  },
  mounted() {
    this.reportsLoad();
  },
  methods: {
    async reportsLoad() {
      let urlString = "/dashboard";
      await axios
        .get(urlString, {
          baseURL: "http://localhost:3000"
        })
        .then(response => {
          this.reports = response.data;
        })
        .catch(err => {
          console.log("error from ExpenseReportList.vue: ", err);
        });
    },
    async reportDisplay(id) {
      /* + this.$route.query.id */
      let urlString = "dashboard?id=" + id;
      await axios
        .get(urlString, {
          baseURL: "http://localhost:3000"
        })
        .then(response => {
          this.reportToShow = response.data;
          this.$bvModal.show("report-on-modal");
          //this.onReportView = true;
          //console.log(this.$refs)
          //this.$refs['report-on-modal'].show();
          //if(this.reportToShow != null)
        })
        .catch(err => {
          console.log("error from ExpenseReportList.vue: ", err);
        });
    },
    async reportAddition(newReport) {
      let urlString = "/dashboard/add";
      await axios
        .post(urlString, newReport, {
          baseURL: "http://localhost:3000"
        })
        .then(response => {
          if (response.data.date) {
            //this. = false;
            this.reportOnAdd = response.data;
            this.reportAdded = true;
            this.onExpenseAdd = true;
            this.reportsLoad();
          } else console.log("zero");
        })
        .catch(err => {
          console.log("error(form) : ", err);
        });
    },
    async reportValidateExpense() {
      this.reportId = null;
      this.reportsLoad();
    },
    async reportDeletion(reportId) {
      let urlString = "/dashboard/delete";
      await axios
        .post(
          urlString,
          { id: reportId },
          {
            baseURL: "http://localhost:3000"
          }
        )
        .then(() => {
          //response.status = 204
          this.reportsLoad();
        })
        .catch(err => {
          console.log("error(list) : ", err);
        });
    },
    async reportModification(report) {
      let urlString = "/dashboard/update";
      await axios
        .post(urlString, report, {
          baseURL: "http://localhost:3000"
        })
        .then(() => {
          this.reportsLoad();
        })
        .catch(err => {
          console.log("error(list) : ", err);
        });
    },
    async expenseAddition(expense) {
      let formData = new FormData();
      formData.append("file", expense.file);
      formData.append("idnotefrais", expense.idnotefrais);
      formData.append("montantfrais", expense.montantfrais);
      formData.append("descfrais", expense.descfrais);

      let urlString = "/uploadImage";
      await axios
        .post(
          urlString,
          formData,
          {
            baseURL: "http://localhost:3000"
          },
          {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          }
        )
        .then(() => {
          this.expenseAdded = true;
          this.reportsLoad();
          console.log("ajouté");
        })
        .catch(err => {
          console.log("error(list) : ", err);
        });
    },
    finishExpenseAdd() {
      this.doneExpenseAdd = true;
    }
  }
};
</script>

<style scoped>
.navbar {
  background-color: #932929;
  top: -27px;
  padding: 0; /*
  height: 57px;*/
}
.button {
  padding: 15px 25px;
  font-size: 24px;
  text-align: center;
  cursor: pointer;
  outline: none;
  color: #fff;
  background-color: #932929;
  border: none;
  border-radius: 15px;
  /* box-shadow: 0 9px #999;*/
}

.button:hover {
  background-color: #fff;
  color: #932929;
}

.button:active {
  background-color: #932929;
  /*box-shadow: 0 5px #666;
  transform: translateY(4px);*/
}

#list {
  /* max-width: 90%;*/
  height: 70%;
  width: 80%;
}

#newReport {
  width: 80%;
}
</style>

