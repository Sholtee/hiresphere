<!--
   File: tag.vue
   Project: job-ad

   Author: Denes Solti
-->

<template lang="pug">
.tag(:style="{color: bg}" v-once)
  span(:style="{'background-color': bg, color: contrastColor}") {{text}}
</template>

<script>
export default {
  name: 'Tag',
  props: {
    bg: {
      type: String,
      required: true,
      validator: value => value.startsWith('#') && value.length === 7
    },
    text: {
      type: String,
      required: true
    }
  },
  computed: {
    contrastColor() {
      const
        hex = this.bg.replace('#', ''),

        // Convert to RGB
        r = parseInt(hex.substring(0, 2), 16),
        g = parseInt(hex.substring(2, 4), 16),
        b = parseInt(hex.substring(4, 6), 16),

        // Calculate relative luminance
        luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

      return luminance > 0.5 ? 'var(--font-color-highlighted)' : 'var(--font-color-disabled)';
    }
  }
};
</script>

<style lang="sass" scoped>
.tag
  position: relative
  display: inline-flex
  cursor: default
  float: right

  &:before, &:after
    content: ''

  &:before
    --tag-pseudo-size: .2rem

    position: absolute
    top: 50%
    transform: translateY(-50%)
    right: .4rem
    width: var(--tag-pseudo-size)
    height: var(--tag-pseudo-size)
    border-radius: var(--tag-pseudo-size)
    background-color: var(--widget-background-color)

  &:after
    --border-magic: .6rem solid transparent

    border-top: var(--border-magic)
    border-bottom: var(--border-magic)
    border-left: var(--border-magic)
    border-left-color: inherit

  > span
    padding: 2px 4px
</style>