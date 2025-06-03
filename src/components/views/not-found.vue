<!--
   File: not-found.vue
   Project: HireSphere

   Author: Denes Solti
-->
<template lang="pug">
.card.img-holder
  img(src="@/assets/grumpy.png")
</template>

<script>
export default {
  name: 'NotFound'
};
</script>

<style lang="sass" scoped>
.img-holder
  align-items: center
  justify-content: center
  width: 90%
  height: 90%
  max-width: 30rem
  max-height: 25rem
  left: 50%
  top: 20%
  transform: translateX(-50%)

  &:after
    content: "404"
    font-size: 2rem
    color: var(--font-color-highlighted)

  > img
    display: block
    max-width: 100%
    max-height: calc(100% - 2rem)
    width: auto
    height: auto
</style>