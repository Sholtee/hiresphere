<!--
   File: app.vue
   Project: job-ad

   Author: Denes Solti
-->

<template lang="pug">
teleport(to="head")
  title {{title}}
loader(:visible="loaderVisible")
router-view
</template>

<script>
import {computed} from 'vue';

import Api from '@/scripts/api.js';
import Loader from "@/components/widgets/loader.vue";

export default {
  name: 'App',
  components: {
    Loader
  },
  provide() {
    const api = new Api();
    api.addEventListener('load', () => this.loaderVisible++);
    api.addEventListener('end-load', () => this.loaderVisible--);
    api.addEventListener('error', ({detail: {error}}) => this.$toast.error(error.toString()));

    return {
      currentUser: computed(() => this.currentUser),
      setTitle: title => this.setTitle(title),
      api
    };
  },
  data() {
    return {
      title: '',
      // api calls might run parallel -> do not use bool
      loaderVisible: 0
    };
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
        this.$router.push({
          name: this.currentUser.roles.includes('guest') ? 'Welcome' : 'ListJobs'
        });
    }
  },
  methods: {
    setTitle(title) {
      const {$resources: {language: {APP_TITLE_SHORT}}} = this;
      this.title = title ? `${APP_TITLE_SHORT} | ${title}` : APP_TITLE_SHORT;
    }
  }
};
</script>

<style src="@/styles/app.sass" lang="sass" />