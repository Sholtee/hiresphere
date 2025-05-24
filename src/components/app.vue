<!--
   File: app.vue
   Project: job-ad

   Author: Denes Solti
-->

<template lang="pug">
teleport(to="head")
  title {{title}}
  link(rel="icon" type="image/png" :href="favIcon")
router-view
</template>

<script>
import {computed} from 'vue';

import icon from '@/assets/favicon.png';

export default {
  name: 'App',
  provide() {
    return {
      currentUser: computed(() => this.currentUser),
      setTitle: title => this.title = title
    };
  },
  data() {
    return {
      title: this.$resources.language.APP_TITLE_SHORT
    };
  },
  computed: {
    currentUser() {
      return this.$router.currentRoute.value.meta.user;
    },
    favIcon() {
      return icon;
    }
  },
  watch: {
    $route(to) {
      if (to.path === '/')
        // if the user is logged in go to the editor else show the welcome screen
        this.$router.push({
          name: this.currentUser.roles.length ? 'ListJobs' : 'Welcome'
        });
    }
  }
};
</script>

<style src="@/styles/app.sass" lang="sass" />