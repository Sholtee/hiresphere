<!--
   File: welcome.vue
   Project: job-ad

   Author: Denes Solti
-->

<template lang="pug">
.welcome
  slide-show(configJson="/resources/slides.json")
  .card
    text-box(icon="place" :title="$resources.language.ADDRESS")
      | 7633 Pécs, Esztergár Lajosu. 7/b
    text-box(icon="phone" :title="$resources.language.CONTACT")
      span Email: #[a(href="mailto:vki@vhol.hu") mailto:vki@vhol.hu]
      | Phone: +36301234567
</template>

<script>
import SlideShow from "@/components/widgets/slide-show.vue";
import TextBox from "@/components/widgets/text-box.vue";

export default {
  name: 'Welcome',
  components: {
    SlideShow,
    TextBox
  },
  inject: ['api']
};
</script>

<style lang="sass" scoped>
.welcome
  display: flex
  flex-flow: column
  width: 100%

  > *
    margin-left: auto
    margin-right: auto
    margin-bottom: var(--margin-normal)

  > .slide-show
    margin-top: var(--margin-normal)

  > .card
    display: flex
    flex-flow: row

    > .text-box
      margin-bottom: auto
      width: 33%

      &:first-of-type
        margin-left: auto

      &:last-of-type
        margin-right: auto

      &:not(:last-of-type)
        margin-right: var(--margin-large)
</style>