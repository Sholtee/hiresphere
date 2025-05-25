<!--
   File: job.vue
   Project: job-ad

   Author: Denes Solti
-->
<template lang="pug">
.job
  .head
    .grid
      img(:src="'bad'" @error="$event.target.src = imagePlaceholder")
      span.job-title.highlighted Job title
      span.job-location.has-icon(data-icon="location_on") Job location
      span.company.has-icon(data-icon="domain") Company name
      .tags
        tag(
          v-for="[tag, bg] in [['tag_name_1', '#A8C7FA'], ['tag_name_2', '#000000'], ['tag_name_3', '#ffffff']]"
          :text="tag"
          :bg="bg"
        )
    span.published.highlighted okt. 26
  .body
    .short-description.highlighted {{truncate(shortDescription, 35)}}
  .foot
    button.primary More details
</template>

<script>
import imagePlaceholder from '@/assets/company.png';
import Tag from '@/components/widgets/tag.vue';

export default {
  name: 'Job',
  components: {
    Tag
  },
  props: {},
  setup() {
    return {
      imagePlaceholder
    };
  },
  data() {
    return {
      expanded: false,
      shortDescription: `
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc augue ex, fringilla ut dignissim sit amet,
        ullamcorper a urna. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis
        egestas. Morbi ut purus tristique, porta libero a, mattis nisi.
      `
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

    > button:first-of-type
      margin-left: auto
</style>