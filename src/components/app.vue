<!--
   File: app.vue
   Project: job-ad

   Author: Denes Solti
-->

<template lang="pug">
router-view
</template>

<script>
import {computed} from 'vue';

export default {
  name: 'App',
  provide() {
    return {currentUser: computed(() => this.currentUser)};
  },
  computed: {
    currentUser() {
      return this.$router.currentRoute.value.meta.user;
    }
  },
  watch: {
    $route(to) {
      if (to.path === '/')
        // if the user is logged in go to the editor else show the welcome screen
        this.$router.push({name: this.currentUser.roles.length ? 'Jobs' : 'Welcome'});
    }
  }
};
</script>

<style src="@/styles/app.sass" lang="sass" />