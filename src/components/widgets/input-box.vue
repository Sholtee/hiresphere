<!--
   File: input-box.vue
   Project: HireSphere

   Author: Denes Solti
-->

<template lang="pug">
.input-holder.has-icon(v-bind="{class: $attrs.class, 'data-icon': $attrs.icon}")
  input(
    v-bind="{placeholder: $attrs.placeholder, type: $attrs.type, ...eventListeners}"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    ref="input"
  )
</template>

<script>
export default {
  name: 'InputBox',
  inheritAttrs: false,
  props: {
    modelValue: {
      type: null,
      required: true
    },
    focus: Boolean
  },
  emits: ['update:modelValue'],
  computed: {
    eventListeners() {
      return Object
        .entries(this.$attrs)
        .filter(([, v]) => typeof v === 'function')
        .reduce((accu, [k, v]) => ({
          ...accu,
          [k]: v
        }), {});
    }
  },
  mounted() {
    if (this.focus)
      this.$refs.input.focus();
  }
};
</script>

<style lang="sass" scoped>
.input-holder
  --input-height-mod: calc(var(--input-height) + .5rem)

  height: var(--input-height-mod)
  color: var(--font-color-highlighted)

  &:before
    border: 1px solid var(--input-border-color)
    border-right: unset
    border-top-left-radius: var(--border-radius-small)
    border-bottom-left-radius: var(--border-radius-small)
    padding-left: var(--padding-small)
    padding-right: var(--padding-small)
    margin-right: 0
    height: 100%
    box-sizing: border-box
    line-height: var(--input-height-mod)
    background-color: var(--input-extension-background-color)

  > input
    border-bottom-left-radius: 0
    border-top-left-radius: 0
    height: 100%
    width: 100%
</style>