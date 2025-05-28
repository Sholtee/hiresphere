<!--
   File: slide-show.vue
   Project: job-ad

   Author: Denes Solti
-->
<template lang="pug">
.slide-show(v-if="images.length")
  img(
    v-for="image in images" :key="image.id"
    :class="{...image.cls, visible: image.id === active}"
    :src="image.src"
    @transitionend="imgTransitionEnd(image)"
    @click="image.click"
  )
  .timer
    .bar(:style="barStyle" @transitionend="loadNextImg")
  button.material-icons(v-if="images.length > 1" @click="loadPrevImg" :disabled="inTransition") arrow_back_ios
  button.material-icons(v-if="images.length > 1" @click="loadNextImg" :disabled="inTransition") arrow_forward_ios
</template>

<script>
export default {
  name: 'SlideShow',
  props: {
    configJson: {
      type: String,
      required: true
    },
    timeout: {
      type: Number,
      default: 8
    }
  },
  data() {
    return {
      active: 0,
      images: [],
      inTransition: false,
      barStyle: {}
    };
  },
  watch: {
    configJson: {
      async handler(config) {
        const images = await (await fetch(config)).json();
        this.images = images.map(({src, href}, id) => ({
          id,
          src,
          cls: {},
          click() {
            window.location.href = href;
          }
        }));
        this.active = 0;
      },
      immediate: true
    }
  },
  async mounted() {
    await timeout(100);
    this.startCountdown();
  },
  methods: {
    imgTransitionEnd(img) {
      img.cls = {};

      this.active = img.id;
      this.inTransition = false;
      this.startCountdown();
    },
    async loadImg(index, shifter) {
      this.inTransition = true;

      // reset the countdown
      this.barStyle = {};

      const {cls} = this.images[index];

      cls[shifter] = true;
      await timeout(100);
      cls['transform-start'] = true;
    },
    loadNextImg() {
      const {active, images: {length: allImages}} = this;
      this.loadImg((active + 1) % allImages, 'shifted-right');
    },
    loadPrevImg() {
      const {active, images: {length: allImages}} = this;
      this.loadImg((active - 1 + allImages) % allImages, 'shifted-left');
    },
    startCountdown() {
      this.barStyle = {
        transition: `width ${this.timeout}s`,
        width: '100%'
      };
    }
  }
};

function timeout(ms) {
  return new Promise(resolve => window.setTimeout(resolve, ms));
}
</script>

<style lang="sass" scoped>
.slide-show
  --slide-show-height: 20rem

  position: relative
  width: 60rem
  max-width: 90%
  height: var(--slide-show-height)
  max-height: var(--slide-show-height)
  border-radius: var(--border-radius-large)
  box-shadow: var(--default-box-shadow)
  overflow: hidden

  > img
    position: absolute
    display: none
    width: 100%
    height: auto
    right: 0
    top: 50%
    will-change: transform
    transition: transform var(--default-transition-len)

    &.shifted-right, &.shifted-left
      display: block
      z-index: 1

    &.shifted-right
      transform: translate(100%, -50%)

    &.shifted-left
      transform: translate(-100%, -50%)

    &.visible, &.transform-start
      transform: translate(0, -50%)

    &.visible
      display: block
      cursor: pointer

  > button.material-icons, > .timer
    z-index: 2

  > button.material-icons
    position: absolute
    font-size: 2rem
    color: white
    top: 50%
    transform: translateY(-50%)
    text-shadow: var(--default-text-shadow)

    &:hover
      background-color: unset

    &:first-of-type
      left: var(--margin-small)

    &:last-of-type
      right: var(--margin-small)

  > .timer
    position: absolute
    width: 100%
    bottom: 0

    > .bar
      background-color: var(--loader-color)
      box-shadow: var(--default-box-shadow)
      height: .2rem
      width: 0
      will-change: width
</style>