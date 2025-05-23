<!--
   File: jobs.vue
   Project: job-ad

   Author: Denes Solti
-->

<template lang="pug">
span Jobs
</template>

<script>
export default {
  name: 'Jobs',
  beforeCreate() {
    console.log(`User is logged in: ${this.$router.currentRoute.value.meta.user.roles}`);
  }
};
</script>

<style lang="sass">

</style>