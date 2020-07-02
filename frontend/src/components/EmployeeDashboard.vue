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
            <button type="button" class="myButton" @click="deconnex()">Déconnexion</button>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <!--Ajout de notes de frais-->
    <div>
      <b-card id="newReport">
        <b-row align-h="center">
          <b-col sm>
            <!--Création note de frais-->
            <CreateExpenseReport
              :newReport="reportOnAdd"
              :onReportAdd="onReportAdd"
              :onExpenseAdd="onExpenseAdd"
              :expenses="expensesArray"
              @reportAdded="reportAddition"
              @save="saveReporting"
              @abandonAdd="abandonReporting"
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
      <ListExpenseReports
        :reportsList="reports"
        @reportDeleted="reportDeletion"
        @reportViewed="reportDisplay"
        @reportModified="reportModify"
      />
    </div>

    <!--Fenêtre de visualisation d'une note de frais-->
    <div v-if="reportToShow">
      <b-modal id="report-on-modal" hide-footer no-close-on-backdrop>
        <template v-slot:modal-title>
          <input type="text" :value="reportToShow.libelle" v-if="modalOnModify" />
          <i v-else>{{ reportToShow.libelle }}</i>

          <button class="myButton" @click="modalOnModify = false" v-if="modalOnModify">
            <img src="../img/icone_enregistrer.png" /> &nbsp;Enregistrer
          </button>

          <button class="myButton" @click="modalOnModify = true" v-else>
            <img src="../img/icone_modifier.png" /> Modifier
          </button>
        </template>
        <div class="d-block text-center">{{ reportToShow.description }}</div>

        <!-- <div>
          <ul>
            <li
              v-for="expense in expensesToShow"
              :key="expense.description"
            >{{ expense.descriptionfrais }}</li>
          </ul>
        </div> -->

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
      expensesToShow: null,
      //onListView: true,
      onExpenseAdd: false,
      onReportAdd: false,
      //reportAdded: false,
      expenseAdded: false,
      expensesArray: [],
      doneExpenseAdd: false,
      reportOnAdd: {
        idnotefrais: 0
      },
      modalOnModify: false
      //onReportView: false
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
    async reportDisplay(id) {
      let urlString = "dashboard?id=" + id;
      await axios
        .get(urlString, {
          baseURL: "http://localhost:3000"
        })
        .then(response => {
          this.reportToShow = response.data.expenseReport;
          if (response.data.expenses.length > 0)
            this.expensesToShow = response.data.expenses;

          this.$bvModal.show("report-on-modal");
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
            this.onReportAdd = true;
            //this.reportAdded = true;
            this.onExpenseAdd = true;
          } else console.log("zero");
        })
        .catch(err => {
          console.log("error(form) : ", err);
        });
    },
    async reportValidateExpense() {
      this.reportId = null;
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
          this.expensesArray.push(expense);
          
          console.log("ajouté");
        })
        .catch(err => {
          console.log("error(list) : ", err);
        });
    },
    finishExpenseAdd() {
      this.onExpenseAdd = false;
      //this.doneExpenseAdd = true;
    },
    saveReporting() {
      this.onReportAdd = false;
      //notification bien ajouté

      this.reportsLoad();
    },
    abandonReporting(idnotefrais) {
      this.onExpenseAdd = false;
      this.onReportAdd = false;
      this.expensesToShow = [];
      this.expensesArray = [];
      this.reportDeletion(idnotefrais);
      //notification bien ajouté
    },
    reportModify(id) {
      this.reportDisplay(id);
      this.modalOnModify = true;
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

#list {
  /* max-width: 90%;*/
  height: 70%;
  width: 80%;
}

#newReport {
  width: 80%;
  background-color: #ddd9cf;
}
</style>

