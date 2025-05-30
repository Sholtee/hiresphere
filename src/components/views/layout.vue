<!--
   File: layout.vue
   Project: job-ad

   Author: Denes Solti
-->

<template lang="pug">
#app-frame
  .head
    .click-trap(@click="menuVisible = false" v-if="menuVisible")
    button.material-icons.hamburger(@click="menuVisible = !menuVisible" ref="hamburger") menu
    .title(v-once) {{$resources.language.APP_TITLE}}
    .details(:class="{visible: menuVisible}" ref="details")
      .title.has-icon(data-icon="domain" v-once) {{$resources.language.APP_TITLE}}
      router-link.nav.has-icon(v-for="{name, titleId, icon} in routes" :to="{name}" :data-icon="icon")
        | {{$resources.language[titleId]}}
    check-box(id="dark-mode" @change="darkMode = $event" :initial-value="prefersDarkMode")
      .has-icon(data-icon="dark_mode")
  .body
    router-view
</template>

<script>
import CheckBox from "@/components/widgets/check-box.vue";

export default {
  name: 'Layout',
  components: {
    CheckBox
  },
  inject: ['currentUser'],
  data() {
    return {
      menuVisible: false,
      darkMode: false
    };
  },
  computed: {
    routes() {
      return this
        .$router
        .getRoutes()
        .filter(({meta: {nav, requiredRoles}}) =>
          // if requiredRoles is null the every user can visit the view
          nav && requiredRoles?.some(role => this.currentUser.roles.includes(role)) !== false)
        .map(({name, meta: {nav: {icon, titleId}}}) => ({
          name,
          icon,
          titleId
        }));
    },
    prefersDarkMode() {
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
  },
  watch: {
    darkMode(val) {
      document.body.classList.toggle('dark', val);
    }
  }
};
</script>

<style lang="sass" scoped>
@use "@/styles/functions" as *
@use "@/styles/mixins" as *

#app-frame
  --box-shadow: 0 1px 4px 0 rgba(0,0,0,0.37)
  --button-border: .3rem solid transparent
  --click-trap-z-index: 4
  --icon-size-default: 2rem
  --icon-size-large: 7rem
  --no-border: 0 solid transparent

  position: relative
  display: flex
  flex-flow: column
  width: 100%
  height: 100%

  .vertically-centered
    position: absolute
    top: 50%
    transform: translateY(-50%)

  > .head
    position: relative
    height: 4rem
    width: 100%
    background-color: var(--widget-background-color)
    box-shadow: var(--box-shadow)
    z-index: calc(var(--click-trap-z-index) - 1)

    > .click-trap
      display: none

      +media-max-width-50
        position: fixed
        display: block
        left: 0
        top: 0
        width: 100%
        height: 100%
        z-index: var(--click-trap-z-index)

    > .hamburger
      @extend .vertically-centered

      display: none
      left: var(--margin-small)
      padding: var(--padding-small)
      font-size: 1.5rem
      color: var(--font-color-highlighted)

    > .switch
      @extend .vertically-centered

      right: var(--padding-normal)

    .title
      width: max-content
      font-size: 1.5rem
      color: var(--font-color-disabled)

    > .title
      display: none

    > .details
      position: relative
      display: flex
      flex-flow: row
      height: 100%

      > .title
        @extend .vertically-centered

        left: var(--margin-normal)

        &:before
          color: var(--app-icon-color)
          font-size: var(--icon-size-default)
          margin-right: var(--margin-normal)

      > .nav
        height: 100%
        font-size: 1.3rem
        box-sizing: border-box
        padding-left: var(--padding-normal)
        padding-right: var(--padding-normal)
        border-top: var(--button-border)
        border-bottom: var(--button-border)
        border-left: var(--no-border)
        border-right: var(--no-border)
        will-change: border-bottom-color, background-color
        transition: border-bottom-color, background-color var(--default-transition-len)
        color: var(--font-color-highlighted)
        text-decoration: none

        &:hover, &.router-link-exact-active
          border-bottom-color: var(--button-primary-background)
          background-color: darken(var(--widget-background-color), 92%)

        &:not(:last-of-type)
          margin-right: var(--margin-small)

        &:first-of-type
          margin-left: auto

        &:last-of-type
          margin-right: auto

    +media-max-width-50
      > .hamburger
        display: block

      > .title
        position: absolute
        display: block
        left: 50%
        top: 50%
        transform: translate(-50%, -50%)

      > .details
        position: fixed
        left: 0
        top: 0
        flex-flow: column
        width: 20rem
        max-width: 80%
        background-color: var(--widget-background-color)
        box-shadow: var(--box-shadow)
        transform: translateX(-101%)
        will-change: transform
        transition: transform var(--default-transition-len)
        z-index: calc(var(--click-trap-z-index) + 1)

        &.visible
          transform: translateX(0)

        > .title
          position: relative
          transform: unset
          top: 0
          left: 0
          height: var(--icon-size-large)
          width: var(--icon-size-large)
          margin: var(--margin-normal) auto var(--margin-large)
          overflow: hidden

          &:before
            font-size: var(--icon-size-large)
            margin-right: 0

        > .nav
          height: max-content
          width: 100%
          margin: 0 0 var(--margin-normal)
          padding: var(--padding-small)
          border-top: var(--no-border)
          border-bottom: var(--no-border)
          border-right: var(--button-border)
          will-change: border-right-color
          transition: border-right-color var(--default-transition-len)

          &:hover, &.router-link-exact-active
            border-right-color: var(--button-primary-background)

  > .body
    display: flex
    flex: 1
    overflow-y: auto
</style>