<template>
  <div class="mx-auto" style="width: 50rem;">
    <h1>bonjour</h1>
    <span v-if="image === null">chargement...</span>
    <span v-else>
      <img style="max-width: 30rem; max-height: 30rem;" :src="image" alt="Base64 encoded image" />
    </span>
  </div>
</template>

<script>
export default {
  name: "viewfrais",
  data() {
    return {
      file: null,
      image: "http://localhost:3000/downloadImage"
    };
  },
  async mounted() {
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
    async sendData() {}
  }
};
</script>