<template>
  <div>
    <ExpenseReportForm></ExpenseReportForm><br/>
    <ExpenseReportList></ExpenseReportList>
  </div>
</template>

<script>
import ExpenseReportForm from './ExpenseReportForm';
import ExpenseReportList from './ExpenseReportList'

export default {
  name: "EmployeeDashboard",
  components: {
    ExpenseReportForm,
    ExpenseReportList
  }
}
</script>