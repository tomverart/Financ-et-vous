<template>
  <div class="mx-auto" style="width: 50rem;">
    <h1>bonjour</h1>
    <form>
      <!-- <form @submit.prevent="reportAddition"> -->
      <label for="file">phtotos</label>

      <br />
      <input id="file" type="file" ref="file" v-on:change="handleFileUpload()" />

      <br />
      <br />
      <!-- <button class="btn btn-primary" >envoyer données</button> -->
      <button class="btn btn-primary" v-on:click="sendData">envoyer données</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "createfrais",
  data() {
    return {
      file: ""
    };
  },
  async mounted() {},
  methods: {
    async sendData() {
      // Initialize the form data
      let formData = new FormData();

      /*
                Add the form data we need to submit
            */
      formData.append("file", this.file);
      formData.append("blbal", 'ksfklsdfklsf');

      const resp = await this.$axios
        .post("/uploadImage", formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(function() {
          console.log("SUCCESS!!");
        })
        .catch(function() {
          console.log("FAILURE!!");
        });

      console.log(resp);
    },
    handleFileUpload() {
      this.file = this.$refs.file.files[0];
    }
  }
};
</script>