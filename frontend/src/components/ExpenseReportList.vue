<template>
  <div>notes de frais</div>
  <!--<span :v-for="report in reportsList" v-bind:key="reportsList">
        {{ report.label }}
        {{ report.description }}
        <a>inconnu</a>   
      </span>  
    </div> 
    <table>
            <thead>
                <tr>
                  <th>Libellé</th>
                  <th>Description</th>
                  <th>Soumis le</th>
                </tr>
            </thead>
            <tbody>
                <tr :v-for="report in reportsList" v-bind:key="reportsList">
                    <td>{{ report.label }}</td>
                    <td>{{ report.description }}</td>
                    <td>inconnu</td>
                </tr>
            </tbody>
  </table>-->
</template>

<script>
import axios from "axios";

export default {
  name: "ExpenseReportList",
  data() {
    return {
      reportsList: [
        {
          label: null,
          description: null
        }
      ]
    };
  } /*
  props: {
    enteredLabel: null,
    enteredDescription: null
  },*/,
  methods: {
    /*async initPosts () {
      const response = await this.axios.get("http://localhost:8081/dashboard/employee/noteFrais")
      console.log("voici la réponse : ", response)
    },*/
  },
  async mounted() {
    console.log("list component mounted.");
    //const response = axios.get("http://localhost:8081/dashboard/employee/noteFrais")
    //console.log("voici la réponse : ", response)
    await axios
      .get("/employee_dashboard", {
          baseURL: 'http://localhost:3000'
      })
      .then(response => {
        console.log("list component response: ", response);
      })
      .catch(err => {
        console.log("list component error: ", err);
      });
  }
};
</script>

