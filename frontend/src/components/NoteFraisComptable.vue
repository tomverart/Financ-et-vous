<template>
  <div class="mx-auto" style="width: 75rem;">
    <label for="boutonsTri">Tri :</label>
    <br />
    <div
      class="btn-group"
      role="group"
      aria-label="Basic example"
      style="padding-bottom: 2rem;"
      id="boutonsTri"
    >
      <button type="button" class="btn btn-primary" @click="triListe(0)">Tout</button>
      <button type="button" class="btn btn-primary" @click="triListe(1)">En attente</button>
      <button type="button" class="btn btn-primary" @click="triListe(2)">Validées</button>
      <button type="button" class="btn btn-primary" @click="triListe(3)">Refusées</button>
    </div>

    <div>
      <h3>Notes de frais</h3>
      <!-- <br /> -->
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Utilisateur</th>
            <th scope="col">Libelle</th>
            <th scope="col">Etat</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="(noteFrais, index) of ListNoteFraisToShow">
            <tr :key="noteFrais.idnotefrais" v-on:click="expandReport(noteFrais)">
              <th scope="row">{{noteFrais.idnotefrais}}</th>
              <td>{{noteFrais.nomutilisateur}} {{noteFrais.prenomutilisateur}}</td>
              <td>{{noteFrais.libelle}}</td>
              <td>{{listEtatNote[noteFrais.idetatnote -1]}}</td>
              <td>
                <button class="btn" @click="updateEtatNote(noteFrais, 2)">✔</button>
                &nbsp;
                <button class="btn" @click="updateEtatNote(noteFrais, 3)">❌</button>
                {{noteFrais.expand}}
              </td>
            </tr>
            <tr :key="index" v-if="noteFrais.expand">
              <ViewExpenseReports
                :reportToDisplay="reportToShow"
                :onReportView="true"
                @hide="expandReport(noteFrais)"
              />qsdkqsdjld
              <!-- <ViewExpenseReports
          :reportToDisplay="reportToShow"
          :onReportView="onReportView"
          @reportDeleted="reportDeletion"
          @reportModified="reportModification"
          @hide="stopViewing"
              />-->
            </tr>
          </template>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import ViewExpenseReports from "./ViewExpenseReport";

export default {
  name: "noteFraisComptable",
  data() {
    return {
      // Liste des états des notes possibles
      listEtatNote: [],
      // Liste complète des notes de frais
      fullListNoteFrais: [],
      // Liste des notes de frais à afficher
      ListNoteFraisToShow: [],
      // Tri actuel
      currentTri: 0,
      reportToShow: null
    };
  },
  components: {
    ViewExpenseReports
  },
  async mounted() {
    // Récupère la liste des états notes possibles
    var etatNoteToSort = await this.$axios.get("/etatNote").then(response => {
      return response.data;
    });
    etatNoteToSort.forEach(etatNote => {
      this.listEtatNote.push(etatNote.stringetatnote);
    });

    // Ajoute les notes de frais à la liste des notes à afficher et à la liste complète
    this.fullListNoteFrais = this.ListNoteFraisToShow = await this.getFullListNoteFrais();

    this.addExpand(this.fullListNoteFrais);
  },
  methods: {
    // Renvoie les notes de frais
    async getFullListNoteFrais() {
      return await this.$axios.get("/dashboard?id=0").then(response => {
        return response.data;
      });
    },
    // Met à jour l'état de la note de frais
    async updateEtatNote(noteFrais, idEtatNoteToChange) {
      await this.$axios
        .post("/dashboard/update", {
          idnotefrais: noteFrais.idnotefrais,
          idetatnote: idEtatNoteToChange
        })
        .then(response => {
          if (response.status === 200) {
            // Modifie la note dans la liste complète des notes
            this.fullListNoteFrais[
              this.fullListNoteFrais.indexOf(noteFrais)
            ].idetatnote = idEtatNoteToChange;

            // Retire la note de la liste à afficher si toutes les listes ne sont pas affichées
            if (this.currentTri !== 0)
              this.ListNoteFraisToShow.splice(
                this.ListNoteFraisToShow.indexOf(noteFrais),
                1
              );
          }
          // return response.data;
        });
    },

    //  TODO : Diviser le tri en trois listes et les remplir dans le mounted()
    // Tri les notes de frais
    async triListe(idEtatNoteToSort) {
      let tempListTri = [];
      this.currentTri = idEtatNoteToSort;
      // Si "Tout", aucun tri, affiche la liste complète
      if (idEtatNoteToSort === 0) {
        this.ListNoteFraisToShow = this.fullListNoteFrais;
      } else {
        for (var noteFrais of this.fullListNoteFrais) {
          if (noteFrais.idetatnote == idEtatNoteToSort) {
            tempListTri.push(noteFrais);
          }
        }
        this.ListNoteFraisToShow = tempListTri;
      }
    },
    addExpand(listToUpdate) {
      listToUpdate.forEach(report => {
        report.expand = false;
      });
    },
    expandReport(reportToExpand) {
      if (!reportToExpand.expand) {
        this.$route.query.id = reportToExpand.idnotefrais;
        reportToExpand.expand = !reportToExpand.expand;
        if (this.reportToShow == null) {
          this.reportToShow = reportToExpand;
        } else {
          this.ListNoteFraisToShow[
            this.ListNoteFraisToShow.indexOf(this.reportToShow)
          ].expand = false;
        }
      } else {
        // console.log("close");
        this.ListNoteFraisToShow[
          this.ListNoteFraisToShow.indexOf(reportToExpand)
        ].expand = false;
        this.reportToShow = null;
      }
      this.ListNoteFraisToShow.splice(0, 1, this.ListNoteFraisToShow[0]);

      this.ListNoteFraisToShow.forEach(frais => {
        console.log(frais.idnotefrais + " : " + frais.expand);
      });
    }
  }
};
</script>
