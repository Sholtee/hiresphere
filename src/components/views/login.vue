<!--
   File: login.vue
   Project: login

   Author: Denes Solti
-->

<template lang="pug">
span Login
</template>

<script>
export default {
  name: 'Login',
  components: {},
  beforeCreate() {
    console.log(`Redirect to: ${this.$router.currentRoute.value.query.redirectTo}`);
  }
};
</script>

<style lang="sass" scoped>

</style>