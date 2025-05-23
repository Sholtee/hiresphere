<!--
   File: app.vue
   Project: job-ad

   Author: Denes Solti
-->

<template lang="pug">
router-view
</template>

<script>
export default {
  name: 'App',
  watch: {
    $route(to) {
      if (to.path === '/')
        // if the user is logged in go to the editor else show the welcome screen
        this.$router.push({name: this.$router.currentRoute.value.meta.user.roles.length ? 'Jobs' : 'Welcome'});
    }
  }
};
</script>

<style src="@/styles/vars.sass" lang="sass" />