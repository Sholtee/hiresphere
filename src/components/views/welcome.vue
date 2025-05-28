<!--
   File: welcome.vue
   Project: job-ad

   Author: Denes Solti
-->

<template lang="pug">
slide-show(configJson="/resources/slides.json")
</template>

<script>
import SlideShow from "@/components/widgets/slide-show.vue";

export default {
  name: 'Welcome',
  components: {
    SlideShow
  },
  inject: ['api'],
  async mounted() {
    console.log(await this.api.healthcheck());
  }
};
</script>

<style lang="sass" scoped>
.slide-show
  margin-left: auto
  margin-right: auto
  margin-top: var(--margin-normal)
</style>