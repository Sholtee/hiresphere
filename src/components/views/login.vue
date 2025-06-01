<!--
   File: login.vue
   Project: HireSphere

   Author: Denes Solti
-->

<template lang="pug">
.login(v-once)
  input-box(v-model="userName"
    icon="account_circle" :placeholder="$resources.language.LOGIN_USERNAME" @keyup.enter="login" focus)
  input-box(type="password" v-model="password"
    icon="password" :placeholder="$resources.language.LOGIN_PASSWORD" @keyup.enter="login")
  button.primary Login
</template>

<script>
import InputBox from "@/components/widgets/input-box.vue";

export default {
  name: 'Login',
  components: {
    InputBox
  },
  inject: ['setTitle'],
  data() {
    return {
      userName: '',
      password: ''
    };
  },
  beforeMount() {
    this.setTitle(this.$resources.language.TITLE_LOGIN);
  },
  methods: {
    login() {

    }
  }
};
</script>

<style lang="sass" scoped>
.login
  display: flex
  flex-flow: column
  padding: 1rem
  border: 1px solid var(--input-border-color)
  border-radius: var(--border-radius-small)
  height: max-content
  max-width: 90%
  width: max-content
  margin-left: auto
  margin-right: auto
  margin-top: var(--margin-normal)

  > *
    width: 20rem

    &:not(:last-child)
      margin-bottom: var(--margin-normal)
</style>