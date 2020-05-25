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
          <div v-if="oneReportView">
            <ExpenseReportView :reportToDisplay="reportToShow" @reportDeleted="reportDeletion"></ExpenseReportView>
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
      oneReportView: false
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
      this.oneReportView = true;
      let urlString = "dashboard?action=view&id=" + this.$route.query.id;
      await axios
        .get(urlString, {
          baseURL: "http://localhost:3000"
        })
        .then(response => {
          this.reportToShow = response.data;
        })
        .catch(err => {
          console.log("error from ExpenseReportList.vue: ", err);
        });
    },
    async reportAddition(newReport) {
      let urlString = "/dashboard";
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
      let urlString = "/dashboard?action=delete&id=" + this.$route.query.id;
      await axios
        .get(
          urlString,
          {
            baseURL: "http://localhost:3000"
          },
          { params: { id: this.id } }
        )
        .then(() => {   //response.status = 204
          this.reportsLoad();
        })
        .catch(err => {
          console.log("error(list) : ", err);
        });
    }
  }
};
</script>
