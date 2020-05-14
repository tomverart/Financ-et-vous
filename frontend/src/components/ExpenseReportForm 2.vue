expenseForm

<template>
  <div>
    <div>
      <label for="reportLabel">Libellé</label>
      <input id="reportLabel" type="text" v-model="label" />
      <label for="reportDescription">Description</label>
      <input id="reportDescription" type="text" v-model="description" />
      <button @click="reportAddition">Ajouter</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ExpenseReportForm",
  data() {
    return {
      label: null,
      description: null
    };
  },
  methods: {
    async reportAddition() {
      axios({
        method: "post",
        url: "/new_Report",
        data: {
          label: this.label,
          description: this.description
        },
        baseURL: "http://localhost:3000"
      })
        .then(result => {
          console.log("response(form): ", result);
        })
        .catch(err => {
          console.log("error(form) : ", err);
        });
      /*await axios
        .post("/new_report", {
          data: {
            label: this.label,
            description: this.description
          },
          baseURL: 'http://localhost:3000'
        })
        .then(result => {
          console.log("response(form): ", result);
          //this.$emit("reportAdded", this.label, this.description);
        })
        .catch(err => {
          console.log("error(form) : ", err);
        });*/
    }
  }
};
</script>

