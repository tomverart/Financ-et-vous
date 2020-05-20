<template>
  <div class="mx-auto" style="width: 50rem;">
    <h1>bonjour</h1>
    <form>
    <!-- <form @submit.prevent="reportAddition"> -->
       <label for="login">phtotos</label>

    <br />
        <input id="image-file" type="file" />

    <br />
    <br />
    <button class="btn btn-primary" >envoyer donnée</button>
    <!-- <button class="btn btn-primary" v-on:click="sendData">envoyer donnée</button> -->
    </form>
  </div>
</template>

<script>
export default {
  name: "viewfrais"
  // data() {
  //   return {};
  // },
  // async mounted() {},
  // methods: {}
};
</script>