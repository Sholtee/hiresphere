<!--
   File: welcome.vue
   Project: HireSphere

   Author: Denes Solti
-->

<template lang="pug">
.welcome
  slide-show(configJson="/resources/slides.json")
  .content(v-if="content" v-html="content")
  .foot.card
    text-box(icon="place" :title="$resources.language.ADDRESS")
      | 7633 Pécs, Esztergár Lajosu. 7/b
    text-box(icon="phone" :title="$resources.language.CONTACT")
      span Email: #[a(href="mailto:vki@vhol.hu") vki@vhol.hu]
      | Phone: +36301234567
</template>

<script>
import mdFactory from 'markdown-it';

import SlideShow from "@/components/widgets/slide-show.vue";
import TextBox from "@/components/widgets/text-box.vue";

const md = mdFactory({
  // we can allow html tags since the content is not user provided
  html: true,
  breaks: true
});

export default {
  name: 'Welcome',
  components: {
    SlideShow,
    TextBox
  },
  inject: ['setTitle'],
  data() {
    return {
      content: false
    };
  },
  async beforeMount() {
    this.setTitle(this.$resources.language.TITLE_HOME);
    this.content = md.render(await (await fetch('/resources/welcome.md')).text());
  }
};
</script>

<style lang="sass" scoped>
@use "@/styles/mixins" as *

.welcome
  width: 100%
  height: max-content

  > *
    margin-left: auto
    margin-right: auto
    margin-bottom: var(--margin-normal)

  > .slide-show
    margin-top: var(--margin-normal)

  > .content
    width: var(--card-width)
    max-width: var(--card-max-width)
    color: var(--font-color-highlighted)

  > .foot
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

    +media-max-width-55
      flex-flow: column

      > .text-box
        width: 100%
        margin-left: auto
        margin-right: auto

        &:not(:last-of-type)
          margin-bottom: var(--margin-normal)
</style>