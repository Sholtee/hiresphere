<!--
   File: text-box.vue
   Project: login

   Author: Denes Solti
-->
<template lang="pug">
.text-box(v-once)
  .title.has-icon(:data-icon="icon" :data-title="title")
  .content
    slot
</template>

<script>
export default {
  name: 'TextBox',
  props: {
    icon: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    }
  }
};
</script>

<style lang="sass" scoped>
.text-box
  display: inline-block
  justify-content: center
  width: max-content
  box-sizing: border-box

  > *
    display: flex
    flex-flow: column
    align-items: center

  > .title
    &:before
      font-size: 2rem
      color: var(--button-primary-background)
      margin: 0 0 var(--margin-small)

    &:after
      content: attr(data-title)
      font-size: 1.2rem
      font-weight: 600
      margin-bottom: var(--margin-small)
      color: var(--font-color-highlighted)

  > .content
    color: var(--font-color-disabled)
    line-height: 2rem
</style>