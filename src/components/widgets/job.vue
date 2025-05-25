<!--
   File: job.vue
   Project: job-ad

   Author: Denes Solti
-->
<template lang="pug">
.job(:class="{expanded}" v-once)
  .head
    .grid
      img(:src="'bad'" @error="$event.target.src = imagePlaceholder")
      span.job-title.highlighted Job title
      span.job-location.has-icon(data-icon="location_on") Job location
      span.company.has-icon(data-icon="domain") Company name
      .tags
        tag(
          v-for="[tag, bg] in [\
            ['tag_name_1', '#A8C7FA'],\
            ['tag_name_2', '#000000'],\
            ['tag_name_3', '#ffffff'],\
            ['tag_name_4', '#A8C7FA'],\
            ['tag_name_5', '#A8C7FA'],\
          ]"
          :text="tag"
          :bg="bg"
        )
    span.published.highlighted okt. 26
  .body
    .highlighted(v-if="expanded" v-html="md.render(description)" )
    .highlighted(v-else) {{truncate(description, 35)}}
  .foot
    button.secondary(v-if="expanded" @click="$router.go(-1)") Back
    button.primary(@click="console.log('click')" v-if="expanded") Apply for this job
    button.primary(@click="console.log('click')" v-else) More details
</template>

<script>
import mdFactory from 'markdown-it';

import imagePlaceholder from '@/assets/company.png';
import Tag from '@/components/widgets/tag.vue';

export default {
  name: 'Job',
  components: {
    Tag
  },
  props: {
    expanded: {
      type: Boolean
    }
  },
  setup() {
    return {
      imagePlaceholder,
      md: mdFactory({
        // disable HTL tags in the input
        html: false,
        breaks: true
      })
    };
  },
  data() {
    return {
      description: '# Title\n' +
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc augue ex, fringilla ut dignissim sit amet, ' +
        'ullamcorper a urna. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis ' +
        'egestas. Morbi ut purus tristique, porta libero a, mattis nisi.\n' +
        '- list item 1\n' +
        '- list item 2\n' +
        '- list item 3'
    };
  },
  methods: {
    truncate(str, maxWords) {
      const words = str.trim().split(/\s+/);
      if (words.length > maxWords)
        str = `${words.slice(0, maxWords).join(' ')}...`;
      return str;
    }
  }
};
</script>

<style lang="sass" scoped>
.job
  --holder-width: 30rem

  position: relative
  display: inline-flex
  flex-flow: column
  width: 50rem
  max-width: 90%
  box-sizing: border-box
  height: max-content
  box-shadow: var(--default-box-shadow)
  border-radius: var(--border-radius-small)
  padding: var(--padding-normal)
  margin-left: auto
  margin-right: auto
  margin-top: 10rem
  background-color: var(--widget-background-color)

  .highlighted
    color: var(--font-color-highlighted)

  > .head
    position: relative

    > .grid
      --img-size: 9rem

      display: grid
      width: 100%
      height: var(--img-size)
      grid-template-columns: var(--img-size) calc(100% - var(--img-size) - var(--margin-normal))  // 2 columns
      grid-template-rows: 30% 20% 20% 30%   // 4 rows
      column-gap: var(--margin-normal)

      > img
        grid-column: 1
        grid-row: 1 / span 4  // A spans all 3 rows
        background: white
        object-fit: contain
        width: 100%
        height: 100%

      > span
        grid-column: 2
        display: flex
        align-items: center

      > .job-title
        grid-row: 1
        font-weight: bold
        font-size: var(--font-size-large)

      > [data-icon]
        color: var(--font-color-disabled)
        font-size: 1.2em

      >.job-location
        grid-row: 2

      > .company
        grid-row: 3

      > .tags
        grid-row: 4
        display: flex
        overflow-y: auto

        > .tag
          margin-top: auto
          margin-bottom: auto

          &:not(:last-of-type)
            margin-right: var(--margin-small)

    > .published
      position: absolute
      right: 0
      top: 0

  > *:not(:first-of-type)
    margin-top: var(--margin-normal)

  > .foot
    display: flex

    > button
      min-width: 5rem

      &:first-of-type
        margin-left: auto

      &:not(:last-of-type)
        margin-right: var(--margin-normal)

  &.expanded
    background-color: transparent
    box-shadow: unset
    padding: unset

    > .body
      box-shadow: var(--default-box-shadow)
      border-radius: var(--border-radius-small)
      padding: var(--padding-normal)

      > .highlighted
        ::v-deep(h1)
          font-size: 1.5em
</style>