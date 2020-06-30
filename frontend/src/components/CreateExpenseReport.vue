<template>
  <div class="mx-auto">
    <h4>Déclarer note de frais</h4>

    <div v-if="onReportAdd">
      <b-row>
        <b-col>
          <h5>{{ newReport.libelle}}</h5>
          <p>{{ newReport.description }}</p>
        </b-col>
      </b-row>

      <b-row>
        <b-col>
          <div style="max-height: 20%">
            <ul>
              <li v-for="expense in expenses" :key="expense.description">{{ expense.description }}</li>
            </ul>
          </div>
        </b-col>
      </b-row>

      <b-row>
        <b-col>
          <button :disabled="onExpenseAdd" @click="confirmAdd(true)">Enregistrer</button>
          <button @click="confirmAdd(false)">Abandonner</button>
        </b-col>
      </b-row>
    </div>

    <div v-else>
      <form v-on:submit.prevent="onSubmit">
        <b-row class="my-1">
          <b-col sm>
            <input
              v-model="label"
              style="width: 50%;"
              type="text"
              class="form-control"
              id="label"
              placeholder="Titre"
              required
            />
          </b-col>
        </b-row>

        <b-row class="my-1">
          <b-col md>
            <textarea
              class="form-control"
              rows="2"
              id="reportDescription"
              placeholder="Ajoutez une description"
              v-model="description"
              required
            ></textarea>
          </b-col>
        </b-row>

        <b-row class="my-1">
          <b-col md>
            <button class="btn btn-dark">Créer</button>
          </b-col>
        </b-row>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "createExpenses",
  data() {
    return {
      label: "",
      description: null
    };
  },
  props: {
    //addSuccess: null,
    onReportAdd: null,
    newReport: null,
    onExpenseAdd: null,
    expenses: null
  },
  watch: {
    onReportAdd: function() {
      if (this.onExpenseAdd) {
        //si la NF est déjà saisie et enregistrée
        //vider les champs auparavant remplis
        this.description = "";
        this.label = "";
      }
    }
  },
  methods: {
    // Création de la note de frais
    onSubmit() {
      this.$emit("reportAdded", {
        label: this.label,
        description: this.description
      });
    },
    confirmAdd(confirmation) {
      if (confirmation) {
        //notification "note de frais enregistrée"
        this.$emit("save");

        // vide les champs du formulaire
        this.description = "";
        this.label = "";
      } else {
        //notification "déclaration annulée"
        //suppression de note de frais previously ajouté (pas la meilleure façon de faire mais bon..)
        this.$emit("abandonAdd", this.newReport.idnotefrais);
      }
    }
  }
};
</script>
