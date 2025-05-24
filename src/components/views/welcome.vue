<!--
   File: welcome.vue
   Project: job-ad

   Author: Denes Solti
-->

<template lang="pug">
span Welcome
</template>

<script>
export default {
  name: 'Welcome',
  inject: ['api'],
  async mounted() {
    console.log(await this.api.healthcheck());
  }
};
</script>

<style lang="sass">

</style>