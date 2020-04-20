<template>
<div>
  <head>
    <!-- Bootstrap -->
    <link
      rel="stylesheet"
      href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
      integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
      crossorigin="anonymous"
    />
  </head>

  <!-- Barre de navigation-->
  <nav class="navbar navbar-light bg-light">
    <a class="navbar-brand" href="/">Fianc-et-vous</a>
  </nav>

  <div class="mx-auto" style="width: 500px;">
    <!-- <connexion-form v-on:log="connexion" style="padding-top: 50px;"/> -->
    <router-view>
    </router-view>
  </div>
</div>
</template>

<script>
// import ConnexionForm from "./components/ConnexionForm.vue";

export default {
  name: "App",
  components: {
    // ConnexionForm
  },
  methods: {
    connexion(logs) {
      console.log(logs.Login, logs.Password);
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
