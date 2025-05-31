<!--
   File: infinite-scroll.vue
   Project: HireSphere

   Author: Denes Solti
-->
<template lang="pug">
.scrollable
  .items(ref="holder" @scroll="onScroll")
    slot(:renderInitialItems="renderInitialItems")
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
  setup() {
    return {
      // does not have to be reactive
      inInitPhase: false
    };
  },
  data() {
    return {
      fabVisible: false
    };
  },
  async mounted() {
    this.handleResize = debounce(() => this.renderInitialItems(), 200);
    window.addEventListener('resize', this.handleResize);
  },
  unmounted() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    onScroll() {
      if (this.inInitPhase)
        return;

      const {holder: {scrollHeight, scrollTop, clientHeight}} = this.$refs;

      if (scrollHeight - scrollTop - clientHeight < 1)
        this.renderNextPage();

      this.fabVisible = scrollTop > 20;
    },
    async renderInitialItems() {
      this.inInitPhase = true;

      try {
        const {holder} = this.$refs;

        do {
          await this.$nextTick();
        } while (holder.scrollHeight <= holder.clientHeight && await this.renderNextPage());
      } finally {
        this.inInitPhase = false;
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