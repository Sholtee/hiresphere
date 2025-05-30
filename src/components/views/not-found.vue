<!--
   File: not-found.vue
   Project: HireSphere

   Author: Denes Solti
-->
<template lang="pug">
.img-holder
  img(src="@/assets/grumpy.png")
</template>

<script>
export default {
  name: 'NotFound'
};
</script>

<style lang="sass" scoped>
.img-holder
  position: relative
  display: flex
  flex-flow: column
  margin: auto
  align-items: center
  justify-content: center
  width: 90%
  height: 90%
  max-width: 30rem
  max-height: 25rem
  background: white
  border-radius: var(--border-radius-large)
  box-shadow: var(--default-box-shadow)
  padding: var(--padding-normal)

  &:after
    content: "404"
    font-size: 2rem
    color: rgba(0, 0, 0, .3)

  > img
    display: block
    max-width: 100%
    max-height: calc(100% - 2rem)
    width: auto
    height: auto

  @media (max-width: 20rem)
    &:after
      display: none

  @media (max-height: 20rem)
    &:after
      display: none
</style>