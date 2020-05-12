<template>
  <div class="mx-auto" style="width: 50rem;">
    <div
      class="btn-group"
      role="group"
      aria-label="Basic example"
      style="padding-bottom: 2rem; padding-top: 1rem;"
    >
      <button type="button" class="btn btn-primary">Tout</button>
      <button type="button" class="btn btn-primary" @click="triListe(1)">En attente</button>
      <button type="button" class="btn btn-primary" @click="triListe(2)">Validée</button>
      <button type="button" class="btn btn-primary" @click="triListe(3)">Refusée</button>
    </div>

    <div>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Utilisateur</th>
            <th scope="col">Etat</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="noteFrais of ListNoteFraisToShow" :key="noteFrais.idnotefrais">
            <th scope="row">1</th>
            <td>{{noteFrais.nomutilisateur}} {{noteFrais.prenomutilisateur}}</td>
            <td>{{listEtatNote[noteFrais.idetatnote -1]}}</td>
            <td>
              <button class="btn" @click="updateEtatNote(noteFrais, 2)">✔</button>
              &nbsp;
              <button class="btn" @click="updateEtatNote(noteFrais, 3)">❌</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "noteFraisComptable",
  data() {
    return {
      listEtatNote: [],
      // Liste complère des ntoes de frais
      fullListNoteFrais: [],
      // Liste des notes de frais à afficher
      ListNoteFraisToShow: []
    };
  },
  async mounted() {
    // Récupère la liste des états notes possibles
    var etatNoteToSort = await this.$axios.get("/etatNote").then(response => {
      return response.data;
    });
    etatNoteToSort.forEach(etatNote => {
      this.listEtatNote.push(etatNote.stringetatnote);
    });

    // Récupère les notes de frais
    await this.$axios.get("/noteFrais").then(response => {
      console.log(response.data);
      this.fullListNoteFrais = this.ListNoteFraisToShow = response.data;
    });
  },
  methods: {
    async updateEtatNote(noteFrais, idEtatNoteToChange) {
      const updateEtatNote = await this.$axios
        .post("/noteFrais", {
          idNoteFrais: noteFrais.idnotefrais,
          idEtatNote: idEtatNoteToChange
        })
        .then(response => {
          if (response.status === 200) {

            // Modifie la note dans la liste complète des notes
            this.fullListNoteFrais[
              this.fullListNoteFrais.indexOf(noteFrais)
            ].idetatnote = idEtatNoteToChange;

            // Modifie l'état note de la note dans la liste à afficher
            this.ListNoteFraisToShow.splice(
              this.ListNoteFraisToShow.indexOf(noteFrais)
            );
          }
          return response.data;
        });

      console.log(updateEtatNote);
    },

    async triListe(idEtatNoteToSort) {
      let tempListTri = [];
      for (var noteFrais of this.fullListNoteFrais) {
        if (noteFrais.idetatnote == idEtatNoteToSort) {
          tempListTri.push(noteFrais);
        }
      }

      this.ListNoteFraisToShow = tempListTri;
    }
  }
};
</script>