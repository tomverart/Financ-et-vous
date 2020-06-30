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
            <button type="button" class="btn btn-primary" @click="deconnex()">Déconnexion</button>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <button v-on:click="onListView = false">Déclarer note de frais</button>

    <!--Tableau des notes de frais-->
    <b-card-group deck v-if="onListView">
      <b-card v-if="onReportView">
        <ViewExpenseReports
          :reportToDisplay="reportToShow"
          :onReportView="onReportView"
          @reportDeleted="reportDeletion"
          @reportModified="reportModification"
          @hide="stopViewing"
        />
      </b-card>

      <b-card v-else></b-card>
      <b-card style="max-width: 41%;">
        <ListExpenseReports
          :reportsList="reports"
          @reportDeleted="reportDeletion"
          @reportViewed="reportDisplay"
        />
      </b-card>
    </b-card-group>

    <!--Ajout de notes de frais-->
    <div v-else>
      <b-card-group deck>
        <b-card>
          <div v-if="onReportAdd">
            <CreateExpenseReport
              :addSuccess="added"
              :newReport="reportOnAdd"
              @expenseAddRequested="startExpenseAdd"
              @reportAdded="reportAddition"
            />
          </div>
          <div v-else>
            <CreateExpense
              :idnotefraisprops="reportOnAdd.idnotefrais"
              @expenseAdded="expenseAddition"
              @reportValidated="reportValidateExpense"
            />
          </div>
        </b-card>
        <b-card>
          <h2>Some useful informations</h2>
        </b-card>
      </b-card-group>
      <button v-on:click="reportsLoad();onListView = true; onReportView = false">Retour</button>
    </div>
  </div>
</template>

<script>
import ListExpenseReports from "./ListExpenseReports";
import ViewExpenseReports from "./ViewExpenseReport";
import CreateExpenseReport from "./CreateExpenseReport";
import CreateExpense from "./CreateExpense";

import axios from "axios";

export default {
  name: "EmployeeDashboard",
  components: {
    CreateExpenseReport,
    CreateExpense,
    ListExpenseReports,
    ViewExpenseReports
  },
  data() {
    return {
      reports: null,
      reportToShow: null,
      onListView: true,
      onReportAdd: true,
      onExpenseAdd: false,
      added: false,
      reportOnAdd: null,
      onReportView: false
    };
  },
  mounted() {
    this.reportsLoad();
  },
  methods: {
    async deconnex() {
      await this.$axios.get("/disconected");
      this.$router.push("/login");
    },
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
    async reportDisplay() {
      let urlString = "dashboard?id=" + this.$route.query.id;
      await axios
        .get(urlString, {
          baseURL: "http://localhost:3000"
        })
        .then(response => {
          this.reportToShow = response.data;
          this.onReportView = true;
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
            //this.onReportAdd = false;
            this.reportOnAdd = response.data;
            this.added = true;
            this.reportsLoad();
          } else console.log("zero");
        })
        .catch(err => {
          console.log("error(form) : ", err);
        });
    },
    async reportValidateExpense() {
      this.onReportAdd = true;
      this.reportId = null;
      this.reportsLoad();
    },
    async reportDeletion() {
      let urlString = "/dashboard/delete";
      await axios
        .post(
          urlString,
          { id: this.$route.query.id },
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
    stopViewing() {
      this.onReportView = false;
    },
    startExpenseAdd() {
      this.onReportAdd = false;
      this.added = false;
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
          this.reportsLoad();
          console.log("ajouté");
        })
        .catch(err => {
          console.log("error(list) : ", err);
        });
    }
  }
};
</script>

<style scoped>
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
</style>

