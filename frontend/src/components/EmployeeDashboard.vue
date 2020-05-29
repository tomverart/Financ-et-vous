<template>
  <div>
    <ExpenseReportForm @reportAdded="reportAddition"></ExpenseReportForm>
    <br />
    <table>
      <tr>
        <td>
          <ExpenseReportsList
            :reportsList="reports"
            @reportDeleted="reportDeletion"
            @reportViewed="reportDisplay"
          ></ExpenseReportsList>
        </td>
        <td>
          <div v-if="onView">
            <ExpenseReportView
              :reportToDisplay="reportToShow"
              @reportDeleted="reportDeletion"
              @reportModified="reportModification"
              @hide="stopViewing"
            ></ExpenseReportView>
          </div>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import ExpenseReportForm from "./ExpenseReportForm";
import ExpenseReportsList from "./ExpenseReportsList";
import ExpenseReportView from "./ExpenseReportView";

import axios from "axios";

export default {
  name: "EmployeeDashboard",
  components: {
    ExpenseReportForm,
    ExpenseReportsList,
    ExpenseReportView
  },
  data() {
    return {
      reports: null,
      reportToShow: null,
      onView: false,
    //  doneSendingAndReceivingRequestFromServer: false
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
