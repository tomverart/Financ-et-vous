<template>
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
        <tr v-for="noteFrais of listNoteFrais" :key="noteFrais.idnotefrais">
          <th scope="row">1</th>
          <td>{{noteFrais.idutilisateur}}</td>
          <td>{{listEtatNote[noteFrais.idetatnote -1]}}</td>
          <td><button class="btn" @click="updateEtatNote(noteFrais, 2)">✔</button>
          &nbsp;
          <button class="btn" @click="updateEtatNote(noteFrais, 3)">❌</button></td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "noteFraisComptable",
  data() {
    return {
      listEtatNote: [],
      listNoteFrais: []
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
      this.listNoteFrais = response.data;
    });
  },
  methods: {
    async updateEtatNote( noteFrais, idEtatNoteToChange){

      const updateEtatNote = await this.$axios.post("/noteFrais", {
        idNoteFrais: noteFrais.idnotefrais,
        idEtatNote: idEtatNoteToChange
      }).then(response => {
        if(response.status === 200){
          this.listNoteFrais[this.listNoteFrais.indexOf(noteFrais)].idetatnote = idEtatNoteToChange;
        } 
        return response.data;
      })

      console.log(updateEtatNote);

    }
  }

};
</script>