<!--
   File: login.vue
   Project: job-ad

   Author: Denes Solti
-->

<template lang="pug">
span Login
</template>

<script>
export default {
  name: 'Login',
  inject: ['setTitle'],
  beforeMount() {
    this.setTitle(this.$resources.language.TITLE_LOGIN);
  }
};
</script>

<style lang="sass" scoped>

</style>