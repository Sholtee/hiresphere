<!--
   File: layout.vue
   Project: job-ad

   Author: Denes Solti
-->

<template lang="pug">
#app-frame
  .click-trap(@click="menuVisible = false")
  .head
    button.material-icons.hamburger(@click="menuVisible = !menuVisible" ref="hamburger") menu
    .title(v-once) Profession portal
    .details(:class="{visible: menuVisible}" ref="details")
      .title.has-icon(v-once) Profession portal
      router-link.nav.has-icon(
        v-for="{name, title, icon} in routes"
        :class="{selected: $router.currentRoute.value.name === name}"
        :to="{name}"
        :icon="icon"
      ) {{title}}
  .body
    router-view
</template>

<script>
export default {
  name: 'Layout',
  inject: ['currentUser'],
  data() {
    return {menuVisible: false};
  },
  computed: {
    routes() {
      return this
        .$router
        .getRoutes()
        .filter(({meta: {nav, requiredRoles}}) =>
          // if requiredRoles is null the every user can visit the view
          nav && requiredRoles?.some(role => this.currentUser.roles.includes(role)) !== false)
        .map(({name, meta: {nav: {title, icon}}}) => ({
          name,
          title,
          icon
        }));
    }
  }
};
</script>

<style lang="sass" scoped>
#app-frame
  $sidebar-media-max-with: 50rem // cannot be CSS variable

  --box-shadow: 0 1px 4px 0 rgba(0,0,0,0.37)
  --button-border: .3rem solid transparent
  --click-trap-z-index: 1
  --icon-size-default: 2rem
  --icon-size-large: 7rem
  --no-border: 0 solid transparent

  position: relative
  display: flex
  flex-flow: column
  width: 100%
  height: 100%

  > .click-trap
    display: none

    @media (max-width: $sidebar-media-max-with)
      position: absolute
      display: block
      left: 0
      top: 0
      width: 100%
      height: 100%
      z-index: var(--click-trap-z-index)

  > .head
    position: relative
    height: 4rem
    width: 100%
    background-color: white
    box-shadow: var(--box-shadow)

    > .hamburger
      position: absolute
      display: none
      top: 50%
      transform: translateY(-50%)
      left: var(--margin-small)
      padding: var(--padding-small)
      font-size: 1.5rem
      z-index: 1

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
        margin-left: auto
        margin-right: var(--margin-normal)

        @media (max-width: 80rem)
          overflow: hidden
          width: calc(var(--icon-size-default) + var(--margin-normal))

        &:before
          content: "domain"
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

        &:hover, &.selected
          border-bottom-color: var(--button-primary-color)
          background-color: var(--button-active-color)

        &:not(:last-of-type)
          margin-right: var(--margin-small)

        &:last-of-type
          margin-right: auto

    @media (max-width: $sidebar-media-max-with)
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
        background-color: white
        box-shadow: var(--box-shadow)
        transform: translateX(-101%)
        will-change: transform
        transition: transform var(--default-transition-len)
        z-index: calc(var(--click-trap-z-index) + 1)

        &.visible
          transform: translateX(0)

        > .title
          height: var(--icon-size-large)
          width: var(--icon-size-large)
          margin: var(--margin-normal) auto var(--margin-large)

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

          &:hover, &.selected
            border-right-color: var(--button-primary-color)

  > .body
    display: flex
    flex: 1
    overflow-y: auto
</style>