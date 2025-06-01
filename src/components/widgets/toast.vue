<!--
   File: toast.vue
   Project: HireSphere

   Author: Denes Solti
-->
<template lang="pug">
.toast-container
  .toast(v-for="{id, message, type} in toasts" :key="id" :class="type") {{message}}
</template>

<script>
let luid = 0;

export default {
  name: 'Toast',
  data() {
    return {
      toasts: []
    };
  },
  methods: {
    show({message, duration = 3000, type = 'info'}) {
      const id = luid++;
      this.toasts.push({
        id,
        message,
        type
      });

      window.setTimeout(() => this.toasts = this.toasts.filter(t => t.id !== id), duration);
    }
  }
};
</script>

<style lang="sass" scoped>
.toast-container
  position: fixed
  top: var(--padding-normal)
  right: var(--padding-normal)
  z-index: 9999
  display: flex
  flex-direction: column
  gap: var(--padding-normal)

  > .toast
    background: var(--widget-background-color)
    color: #fff
    padding: var(--padding-small)
    border-radius: var(--border-radius-small)
    box-shadow: var(--default-box-shadow)
    animation: fade-in 0.3s ease

    &.success
      background: #28a745

    &.error
      background: #dc3545

    &.info
      background: #17a2b8

    @keyframes fade-in
      from
        opacity: 0
        transform: translateY(-10px)
      to
        opacity: 1
        transform: translateY(0)
</style>