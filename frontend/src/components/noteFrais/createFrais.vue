<template>
  <div class="mx-auto" style="width: 50rem;">
    <!-- <h1>Frais</h1> -->
    <!-- <span v-if="image === null">chargement...</span>
    <span v-else>
    <img style="max-width: 30rem; max-height: 30rem;" :src="image" alt="Base64 encoded image" />
    </span>-->

    <div v-for="(fraisAdd, index) in fraisSup" :key="index">
      <component :is="fraisAdd" :idnotefraisprops="idnotefrais" />
    </div>
    <br />
    <form v-on:submit.prevent="onSubmit">
      <label for="montantfrais">Montant</label>
      <input
        :disabled="validatedExpense"
        v-model="montantFrais"
        type="number"
        id="montantfrais"
        class="form-control"
        style="max-width: 5rem"
      />
      <br />
      <label for="descFrais">Description</label>
      <textarea
        v-model="descFrais"
        type="text"
        id="descFrais"
        class="form-control"
        :disabled="validatedExpense"
      />

      <br />
      <label for="file">Photo</label>
      <br />
      <input
        id="file"
        type="file"
        ref="file"
        v-on:change="handleFileUpload()"
        :disabled="validatedExpense"
      />

      <br />
      <br />
      <button
        class="btn btn-primary"
        v-on:click="sendData(false)"
        :disabled="validatedExpense"
      >Valider</button>
      &nbsp;
      <button
        class="btn btn-primary"
        v-on:click="sendData(true)"
        :disabled="validatedExpense"
      >Valider et ajouter un autre frais</button>
    </form>
  </div>
</template>

<script>
import createFraisComponent from "./createFrais.vue";

export default {
  name: "viewfrais",
  props: {
    idnotefraisprops: {
      type: Number,
      required: true
    }
  },
  // props: ['idnotefrais']
  data() {
    return {
      file: null,
      descFrais: "",
      montantFrais: 0,
      idnotefrais: this.idnotefraisprops,
      fraisSup: [],
      validatedExpense: false
      // image: "http://localhost:3000/downloadImage"
    };
  },
  mounted() {
    // console.log('mounted: ' + this.idnote);
    // console.log(idNoteFrais);
    // return
    // this.file = await this.$axios.get("/downloadImage").then(response => {
    // await this.$axios.get("/downloadImage").then(response => {
    // return response;
    // this.image = 'data:image/jpg;base64,' + response.data;
    // });
    // console.log(this.image);
  },
  methods: {
    hexToBase64(str) {
      return btoa(
        String.fromCharCode.apply(
          null,
          str
            .replace(/\r|\n/g, "")
            .replace(/([\da-fA-F]{2}) ?/g, "0x$1 ")
            .replace(/ +$/, "")
            .split(" ")
        )
      );
    },
    async sendData(addFrais) {
      // Initialize the form data
      let formData = new FormData();

      /*
                Add the form data we need to submit
            */
      formData.append("file", this.file);
      formData.append("idnotefrais", this.idnotefrais);
      formData.append("montantfrais", this.montantFrais);
      formData.append("descfrais", this.descFrais);

      const resp = await this.$axios
        .post("/uploadImage", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(function() {
          console.log("success");
        })
        .catch(function() {
          console.log("failure");
        });

      if (addFrais) {
        this.fraisSup.push(createFraisComponent);
        console.log(this.fraisSup);
        this.validatedExpense = true;
      }
      console.log(resp);
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    },
    onSubmit() {
      console.log("prevent");
    }
  }
};
</script>