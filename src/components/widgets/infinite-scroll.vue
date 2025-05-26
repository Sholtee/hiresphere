<!--
   File: infinite-scroll.vue
   Project: job-ad

   Author: Denes Solti
-->
<template lang="pug">
.scrollable
  .items(ref="holder" @scroll="onScroll")
    slot(:resetItems="resetItems")
  button.fab-up.secondary.material-icons(v-if="fabVisible" @click="scrollToTop") arrow_upward
</template>

<script>
import debounce from 'lodash.debounce';

export default {
  name: 'InfiniteScroll',
  props: {
    renderNextPage: {
      type: Function,
      required: true
    },
    top: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      fabVisible: false
    };
  },
  async mounted() {
    this.handleResize = debounce(() => this.resetItems(), 200);
    window.addEventListener('resize', this.handleResize);
  },
  unmounted() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    onScroll() {
      const {holder: {scrollHeight, scrollTop, clientHeight}} = this.$refs;

      if (scrollHeight - scrollTop - clientHeight < 1)
        this.renderNextPage();

      this.fabVisible = scrollTop > 20;
    },
    async resetItems() {
      const {holder: {scrollHeight, clientHeight}} = this.$refs;

      while (scrollHeight <= clientHeight && await this.renderNextPage()) {
        await this.$nextTick();
      }
    },
    scrollToTop() {
      this.$el.querySelector(this.top)?.scrollIntoView({
        behavior: 'smooth'
      });
    }
  }
};
</script>

<style lang="sass" scoped>
.scrollable
  position: relative
  width: 100%
  height: 100%

  > .items
    position: relative
    box-sizing: border-box
    width: 100%
    height: 100%
    overflow-y: scroll

    > *
      position: relative

  > .fab-up
    position: absolute
    bottom: var(--padding-normal)
    right: var(--padding-normal)
    padding: var(--padding-normal)
    box-shadow: var(--default-box-shadow)
    z-index: 10
</style>