<!--
   File: app.vue
   Project: HireSphere

   Author: Denes Solti
-->

<template lang="pug">
teleport(to="head")
  title {{title}}
loader(:visible="$api.busy")
toast(ref="toast")
.frame-holder
  router-view
.foot
  .version(v-once) {{version}}
  check-box(id="dark-mode" @change="darkMode = $event" :initial-value="prefersDarkMode")
    .has-icon(data-icon="dark_mode")
</template>

<script>
import {computed} from "vue";

import CheckBox from "@/components/widgets/check-box.vue";
import Loader from "@/components/widgets/loader.vue";
import Toast from "@/components/widgets/toast.vue";

export default {
  name: 'App',
  components: {
    Toast,
    CheckBox,
    Loader
  },
  provide() {
    return {
      currentUser: computed(() => this.$router.currentRoute.value.requestor),
      setTitle: title => this.setTitle(title),
      toast: (...args) => this.toast(...args)
    };
  },
  data() {
    return {
      title: '',
      darkMode: false
    };
  },
  computed: {
    prefersDarkMode() {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    },
    version() {
      return window.document.querySelector('meta[name="commit-hash"]')?.content;
    }
  },
  watch: {
    darkMode(val) {
      document.body.classList.toggle('dark', val);
    }
  },
  beforeCreate() {
    this.$api.addEventListener('error', ({detail: {error}}) => this.toast({
      message: error.toString(),
      type: 'error'
    }));
  },
  methods: {
    setTitle(title) {
      const {$resources: {language: {APP_TITLE_SHORT}}} = this;
      this.title = title ? `${APP_TITLE_SHORT} | ${title}` : APP_TITLE_SHORT;
    },
    toast(...args) {
      return this.$refs.toast.show(...args);
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

  > .frame-holder, .foot
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

    > .version
      margin-right: auto
      color: var(--font-color-disabled)

    > label[for="dark-mode"]
      margin-left: auto
</style>