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
    <a class="navbar-brand" @click="clickRoute('/')" style="cursor: pointer;">Financ-et-vous</a>
  </nav>

  <div>
    <router-view></router-view>
  </div>
</div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {};
  },
  components: {},
  mounted() {},
  methods: {
    connexion(logs) {
      console.log(logs.Login, logs.Password);
    },
    clickRoute(pathToRoute) {
      this.$router.push(pathToRoute);
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
