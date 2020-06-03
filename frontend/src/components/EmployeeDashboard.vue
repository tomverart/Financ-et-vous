<template>
  <div>
    <div v-if="onAdd">
      <CreateExpenseReport @reportAdded="reportAddition" />
    </div>
    <div v-else>
      <CreateExpense :idnotefraisprops="reportOnAddId" @expenseAdded="expenseAddition" />
    </div>
    <br />
    <table>
      <tr>
        <td>
          <ListExpenseReports
            :reportsList="reports"
            @reportDeleted="reportDeletion"
            @reportViewed="reportDisplay"
          ></ListExpenseReports>
        </td>
        <td>
          <div v-if="onView">
            <ViewExpenseReports
              :reportToDisplay="reportToShow"
              @reportDeleted="reportDeletion"
              @reportModified="reportModification"
              @hide="stopViewing"
            ></ViewExpenseReports>
          </div>
        </td>
      </tr>
    </table>
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
    // ExpenseReportForm,
    CreateExpenseReport,
    CreateExpense,
    ListExpenseReports,
    ViewExpenseReports
  },
  data() {
    return {
      reports: null,
      reportToShow: null,
      onView: false,
      onAdd: true,
      reportOnAddId: null
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
    async reportDisplay() {
      let urlString = "dashboard?id=" + this.$route.query.id;
      await axios
        .get(urlString, {
          baseURL: "http://localhost:3000"
        })
        .then(response => {
          this.reportToShow = response.data;
          this.onView = true;
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
          this.onAdd = false;
          this.reportOnAddId = response.data.idnotefrais;
          this.reportsLoad();
        })
        .catch(err => {
          console.log("error(form) : ", err);
        });
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
      this.onView = false;
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
