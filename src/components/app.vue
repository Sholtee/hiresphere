<!--
   File: app.vue
   Project: job-ad

   Author: Denes Solti
-->

<template lang="pug">
teleport(to="head")
  title {{title}}
  link(rel="icon" type="image/png" :href="favIcon")
loader(:visible="loaderVisible")
router-view
</template>

<script>
import {computed, toRef} from 'vue';

import Api from '@/scripts/api.js';
import icon from '@/assets/favicon.png';
import Loader from "@/components/widgets/loader.vue";

export default {
  name: 'App',
  components: {
    Loader
  },
  provide() {
    return {
      currentUser: computed(() => this.currentUser),
      setTitle: title => this.title = title,
      api: new Api(toRef(this, 'loaderVisible'))
    };
  },
  data() {
    return {
      title: this.$resources.language.APP_TITLE_SHORT,
      // api calls might run parallel -> do not use bool
      loaderVisible: 0
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