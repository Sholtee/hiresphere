<!--
   File: check-box.vue
   Project: job-ad

   Author: Denes Solti
-->

<template lang="pug">
label.switch(:for="id")
  slot
  .input-holder
    input(:id="id" type="checkbox" @change="emmitUpdate($event.target.checked)" ref="input")
    .track
</template>

<script>
export default {
  name: 'CheckBox',
  props: {
    id: {
      type: String,
      required: true
    },
    initialValue: {
      type: Boolean,
      default: false
    }
  },
  emits: ['change'],
  computed: {
    storageKey() {
      return `cb:${this.id}`;
    }
  },
  mounted() {
    const stored = localStorage.getItem(this.storageKey);

    this.emmitUpdate(this.$refs.input.checked = stored
      ? JSON.parse(stored)
      : this.initialValue);
  },
  methods: {
    emmitUpdate(val) {
      this.$emit('change', val);
      localStorage.setItem(this.storageKey, JSON.stringify(val));
    }
  }
};
</script>

<style lang="sass" scoped>
@import "@/styles/functions"

.switch
  display: flex
  color: var(--font-color-highlighted)

  > .input-holder
    position: relative
    margin-top: auto
    margin-bottom: auto
    margin-left: var(--margin-small)
    width: 25px
    height: 13px

    > input
      opacity: 0
      width: 0
      height: 0

      &:checked + .track
        background-color: lighten(var(--button-secondary-background), 60%)

        &:before
          left: unset
          right: 0
          transform: translate(10%, -50%)

    > .track
      position: absolute
      cursor: pointer
      background-color: var(--font-color-disabled)
      border-radius: var(--border-radius-large)
      top: 0
      left: 0
      right: 0
      bottom: 0

      &:before
        position: absolute
        content: ""
        top: 50%
        left: 0
        transform: translate(-10%, -50%)
        width: 16px
        height: 16px
        background-color: var(--button-secondary-background)
        border-radius: 50%
        box-shadow: var(--default-box-shadow)
</style>