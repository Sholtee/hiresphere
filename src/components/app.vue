<!--
   File: app.vue
   Project: HireSphere

   Author: Denes Solti
-->

<template lang="pug">
teleport(to="head")
  title {{title}}
loader(:visible="loaderVisible")
.frame-holder
  router-view
.foot
  check-box(id="dark-mode" @change="darkMode = $event" :initial-value="prefersDarkMode")
    .has-icon(data-icon="dark_mode")
</template>

<script>
import {computed} from 'vue';

import Api from '@/scripts/api.js';
import CheckBox from "@/components/widgets/check-box.vue";
import Loader from "@/components/widgets/loader.vue";

export default {
  name: 'App',
  components: {
    CheckBox,
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
      loaderVisible: 0,
      darkMode: false
    };
  },
  computed: {
    currentUser() {
      return this.$router.currentRoute.value.meta.user;
    },
    prefersDarkMode() {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
  },
  watch: {
    $route(to) {
      if (to.path === '/')
        // if the user is logged in go to the editor else show the welcome screen
        this.$router.push({
          name: this.currentUser.roles.includes('guest') ? 'Welcome' : 'ListJobs'
        });
    },
    darkMode(val) {
      document.body.classList.toggle('dark', val);
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

<style src="@/styles/includes.sass" lang="sass" />

<style lang="sass">
#app
  position: relative
  display: flex
  flex-direction: column
  height: 100vh
  width: 100vw
  background-color: var(--app-bg)

  > *
    position: relative

  > .frame-holder
    flex: 1 1 auto

  > .foot
    flex: 0 0 auto
    display: flex
    width: 100%
    box-sizing: border-box
    padding: var(--padding-small)
    background-color: var(--widget-background-color)
    border-top: 1px solid var(--input-border-color)

    > label[for="dark-mode"]
      margin-left: auto
</style>