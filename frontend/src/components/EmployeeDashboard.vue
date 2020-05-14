<template>
  <div>
    <ExpenseReportForm @reportAdded="reportAddition" :userId="this.$route.params.userId" :userType="this.$route.params.userType"></ExpenseReportForm><br />
    <ExpenseReportList :reportsList="reports"></ExpenseReportList>
  </div>
</template>

<script>
import ExpenseReportForm from "./ExpenseReportForm";
import ExpenseReportList from "./ExpenseReportList";
import axios from "axios";

export default {
  name: "EmployeeDashboard",
  components: {
    ExpenseReportForm,
    ExpenseReportList
  },
  data() {
    return {
      reports: null
    };
  },
  mounted() {
    this.reportsLoad("page loading");
  },
  methods: {
    async reportsLoad() {
      let urlString = "/dashboard/" + this.$route.params.userType + "/" + this.$route.params.userId;
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
  async reportAddition(newReport) {
    await axios
        .post("/dashboard/" + this.$route.params.userType + "/" + this.$route.params.userId, newReport, {
            baseURL: "http://localhost:3000"
          }
        )
        .then(() => {
          this.reportsLoad();
        })
        .catch(err => {
          console.log("error(form) : ", err);
        });
  }
  }
};
</script>
