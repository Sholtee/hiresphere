<!--
   File: loader.vue
   Project: HireSphere

   Author: Denes Solti
-->

<template lang="pug">
#progress(v-if="visible")
  .bar
</template>

<script>
export default {
  name: 'Loader',
  props: {
    visible: {
      type: Boolean,
      required: true
    }
  }
};
</script>

<style lang="sass">
#progress
  position: fixed
  left: 0
  top: 0
  width: 100%
  z-index: 999999

  > .bar
    position: absolute
    display: block
    height: 4px
    top: 0
    left: 0
    width: 100%
    margin-top: 0
    overflow: hidden
    background-color: var(--app-bg)

    &:before, &:after
      position: absolute
      content: ''
      background-color: var(--loader-color)
      top: 0
      left: 0
      bottom: 0
      will-change: left, right

    &:before
      animation: indeterminate 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite

      @keyframes indeterminate
        0%
          left: -35%
          right: 100%
        60%
          left: 100%
          right: -90%
        100%
          left: 100%
          right: -90%

    &:after
      animation: indeterminate-short 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite
      animation-delay: 1.15s

      @keyframes indeterminate-short
        0%
          left: -200%
          right: 100%
        60%
          left: 107%
          right: -8%
        100%
          left: 107%
          right: -8%
</style>