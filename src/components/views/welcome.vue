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
  inject: ['api', 'setTitle'],
  beforeMount() {
    this.setTitle(this.$resources.language.TITLE_HOME);
  }
};
</script>

<style lang="sass">

</style>