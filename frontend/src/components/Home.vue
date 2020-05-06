<template>
  <div></div>
</template>
<script>
export default {
  mounted() {
    // Reidirige vers /login parceque voilà
    this.$router.push("/login");
    this.$router.push("/dashboard/employee");
  }
};
</script>
