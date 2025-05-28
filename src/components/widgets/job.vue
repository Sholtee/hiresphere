<!--
   File: job-details.vue
   Project: job-ad

   Author: Denes Solti
-->
<template lang="pug">
.job(:class="{expanded}" v-once)
  .head
    .grid
      img(:src="job.logo" @error="$event.target.src = imagePlaceholder")
      span.job-title.highlighted {{job.name}}
      span.job-location.has-icon(data-icon="location_on") {{job.location}}
      span.company.has-icon(data-icon="domain") {{job.company}}
      .tags
        .tag(v-for="tag in job.tags") {{tag}}
    span.published.highlighted {{formatDate(job.created)}}
  .body
    .highlighted(v-if="expanded" v-html="md.render(job.description)" )
    .highlighted(v-else) {{truncate(job.description, 35)}}
  .foot
    slot(name="buttons")
</template>

<script>
import dayjs from 'dayjs';
import mdFactory from 'markdown-it';

import imagePlaceholder from '@/assets/company.png';

export default {
  name: 'Job',
  props: {
    job: {
      type: Object,
      required: true
    },
    expanded: {
      type: Boolean
    }
  },
  setup() {
    return {
      imagePlaceholder,
      md: mdFactory({
        // disable HTML tags in the input
        html: false,
        breaks: true
      })
    };
  },
  methods: {
    formatDate(date) {
      return dayjs(date).format(this.$resources.DATE_FMT);
    },
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
  width: 60rem
  max-width: 90%
  box-sizing: border-box
  height: max-content
  box-shadow: var(--default-box-shadow)
  border-radius: var(--border-radius-small)
  padding: var(--padding-normal)
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
      grid-template-rows: 25% 20% 20% 35%   // 4 rows
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
        overflow: hidden
        white-space: nowrap
        text-overflow: ellipsis

        &.job-title
          grid-row: 1
          font-weight: bold
          font-size: var(--font-size-large)
          color: var(--font-color-highlighted)

        &[data-icon]
          color: var(--font-color-disabled)
          font-size: 1.2em

        &.job-location
          grid-row: 2

        &.company
          grid-row: 3

      > .tags
        grid-row: 4
        display: flex
        overflow-y: auto
        gap: var(--margin-small)

        > .tag
          margin-top: auto
          margin-bottom: auto
          background-color: var(--tag-background)
          padding: var(--padding-small)
          border-radius: var(--border-radius-large)
          font-weight: bold
          font-size: var(--font-size-small)
          color: var(--font-color-highlighted)

      @media (max-width: 50rem)
        display: flex
        flex-flow: column
        height: max-content

        > *
          height: max-content

          &:not(:last-child)
            margin-bottom: var(--margin-small)

        > img, > span
          margin-left: auto
          margin-right: auto

        > img
          height: var(--img-size)
          width: max-content

        > .tags
          overflow-y: unset
          flex-wrap: wrap // wrap items into new rows

    > .published
      position: absolute
      right: 0
      top: 0

  > *:not(:first-of-type)
    margin-top: var(--margin-normal)

  > .foot
    display: flex

    > ::v-deep(button)
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
          font-size: var(--font-size-large)
</style>