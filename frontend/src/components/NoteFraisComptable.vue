<template>
  <div>
    <!-- Barre de navigation-->
    <b-navbar toggleable="lg" type="light">
      <b-navbar-brand>
        <img style="margin-left:auto; margin-right: auto" src="../img/miniature_fond_fonce.png" />
      </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse id="nav-collapse" is-nav>
        <li class="nav-item">
          <button type="button" class="myButton" @click="clickRoute('createUser')">Créer utilisateur</button>
        </li>
        <b-navbar-nav class="ml-auto">
          <b-nav-item>
            <button type="button" class="myButton" @click="deconnex()">Déconnexion</button>
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <div class="mx-auto" style="width: 90rem;">
      <label for="boutonsTri">Tri :</label>
      <br />

      <div
        class="btn-group"
        role="group"
        aria-label="Basic example"
        style="padding-bottom: 2rem;"
        id="boutonsTri"
      >
        <button type="button" class="myButton" @click="triListe(1)">En attente</button>
        <button type="button" class="myButton" @click="triListe(2)">Validées</button>
        <button type="button" class="myButton" @click="triListe(3)">Refusées</button>
        <button type="button" class="myButton" @click="triListe(0)">Tout</button>
      </div>

      <br />
      <div>
        <h3>Notes de frais</h3>
        <table class="table">
          <thead>
            <tr>
              <!-- <th scope="col">#</th> -->
              <th class="tenrem" scope="col">Utilisateur</th>
              <th class="autowidth" scope="col">Libelle</th>
              <th class="tenrem" scope="col">Montant</th>
              <th class="tenrem" scope="col">Etat</th>
              <th style="width: 14rem;" scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <template v-for="(noteFrais, index) of ListNoteFraisToShow">
              <tr :key="noteFrais.idnotefrais">
                <!-- <th scope="row" v-on:click="expandReport(noteFrais)">{{noteFrais.idnotefrais}}</th> -->
                <td
                  v-on:click="expandReport(noteFrais)"
                >{{noteFrais.nomutilisateur}} {{noteFrais.prenomutilisateur}}</td>
                <td v-on:click="expandReport(noteFrais)">{{noteFrais.libelle}}</td>
                <td v-on:click="expandReport(noteFrais)">{{noteFrais.montant}}€</td>
                <td v-on:click="expandReport(noteFrais)">{{listEtatNote[noteFrais.idetatnote -1]}}</td>
                <td>
                  <button
                    v-if="noteFrais.idetatnote != 2"
                    class="myButton"
                    @click="updateEtatNote(noteFrais, 2)"
                  >✔ Valider</button>
                  &nbsp;
                  <button
                    v-if="noteFrais.idetatnote != 3"
                    class="myButton"
                    @click="updateEtatNote(noteFrais, 3)"
                  >❌ Refuser</button>
                </td>
              </tr>
              <tr :key="index" v-if="noteFrais.expand">
                <td />
                <ViewExpenseReports
                  :reportToDisplay="reportToShow"
                  :onReportView="true"
                  :comptable="true"
                  @hide="expandReport(noteFrais)"
                />
              </tr>
            </template>
          </tbody>
        </table>
      </div>
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
      // La note à développer
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

    // Ajoute les notes de frais à la liste à la liste complète
    this.fullListNoteFrais = await this.getFullListNoteFrais();

    // Ajoute le champ "expand" aux objets du tableau
    this.addExpand(this.fullListNoteFrais);

    // Affiche les notes de frais en attente par défaut
    this.triListe(1);
  },
  methods: {
    async goCreateUser() {
      this.$router.push("/createUser");
    },
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

      // Si il y a actuellement une notes de frais affichée, la cache
      if(this.reportToShow !== null){
        this.expandReport(this.reportToShow);
      }
      // Si "Tout", affiche la liste complète
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
    // Ajoute le champ "expand" aux objets du tableau
    addExpand(listToUpdate) {
      listToUpdate.forEach(report => {
        report.expand = false;
      });
    },
    // Méthode d'affichage des frais de la note de frais
    expandReport(reportToExpand) {
      // Si la note choisie n'est pas déjà affichée
      if (!reportToExpand.expand) {
        this.$route.query.id = reportToExpand.idnotefrais;
        reportToExpand.expand = !reportToExpand.expand;
        // Si il y a une note affichée actuellement, la cache.
        if (this.reportToShow != null)
          this.ListNoteFraisToShow[
            this.ListNoteFraisToShow.indexOf(this.reportToShow)
          ].expand = false;

        this.reportToShow = reportToExpand;
        // Si la note choisie est déjà affichée, la cache.
      } else {
        this.ListNoteFraisToShow[
          this.ListNoteFraisToShow.indexOf(reportToExpand)
        ].expand = false;
        this.reportToShow = null;
      }
      // L'affichage des tableaux Vue ne se mettent pas à jour quand une propriété d'un objet change mais se met à jour quand un tableau change.
      // Supprime le premier élément du tableau et le rempalce par lui-même pour provoquer un changement.
      this.ListNoteFraisToShow.splice(0, 1, this.ListNoteFraisToShow[0]);
    },
    // Déconnecter
    async deconnex() {
      await this.$axios.get("/disconected");
      this.$router.push("/login");
    },
    clickRoute(pathToRoute) {
      this.$router.push(pathToRoute);
    }
  }
};
</script>

<style>
.myButton {
  /* background-color: #11ffee00;  couleur transaparente*/
  background-color: #932929;
  border: 0px solid #932929;
  color: #ffffff;
  font-weight: bold;
  font-size: 15px;
  border-radius: 8%;
  margin: 4px;
}
.tenrem {
  width: 10rem;
}
.autowidth {
  width: auto;
}
</style>