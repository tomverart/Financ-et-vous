<template>
  <div>
    <CreateExpensesReport />
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
// import ExpenseReportForm from "./ExpenseReportForm";
import ListExpenseReports from "./ListExpenseReports";
import ViewExpenseReports from "./ViewExpenseReport";
import CreateExpensesReport from "./CreateExpenseReport"

import axios from "axios";

export default {
  name: "EmployeeDashboard",
  components: {
    // ExpenseReportForm,
    CreateExpensesReport,
    ListExpenseReports,
    ViewExpenseReports
  },
  data() {
    return {
      reports: null,
      reportToShow: null,
      onView: false,
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
        .then(() => {
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
    }
  }
};
</script>
