<!--
   File: jobs.vue
   Project: job-ad

   Author: Denes Solti
-->

<template lang="pug">
.jobs
  .search
    .has-icon(data-icon="domain")
      input(type="text" :placeholder="$resources.language.SEARCH_JOB_OR_COMPANY")
    .has-icon(data-icon="location_on")
      input(type="text" :placeholder="$resources.language.SEARCH_LOCATION")
    button.secondary Search
  .job-holder
    job
</template>

<script>
import Job from '@/components/widgets/job.vue';

export default {
  name: 'Jobs',
  components: {
    Job
  }
};
</script>

<style lang="sass" scoped>
.jobs
  width: 100%
  height: 100%
  overflow-y: auto

  > .search
    --border-size: 1px
    --input-height-mod: calc(var(--input-height) + .5rem)

    display: flex
    padding: 1rem
    border: var(--border-size) solid var(--input-boder-color)
    border-radius: var(--border-radius-small)
    height: max-content
    max-width: 90%
    width: max-content
    margin-left: auto
    margin-right: auto
    margin-top: var(--margin-normal)

    > *:not(:last-child)
      margin-right: var(--margin-normal)

    > .has-icon
      height: var(--input-height-mod)

      &:before
        border: var(--border-size) solid var(--input-boder-color)
        border-right: unset
        border-top-left-radius: var(--border-radius-small)
        border-bottom-left-radius: var(--border-radius-small)
        padding-left: var(--padding-small)
        padding-right: var(--padding-small)
        margin-right: 0
        height: 100%
        box-sizing: border-box
        line-height: var(--input-height-mod)

      > input
        border-bottom-left-radius: 0
        border-top-left-radius: 0
        height: 100%

    @media (max-width: 50rem)
      flex-flow: column

      > *:not(:last-child)
        margin-right: 0
        margin-bottom: var(--margin-normal)

  > .job-holder
    display: flex
    flex-flow: column

    > .job
      margin-left: auto
      margin-right: auto
      margin-top: var(--margin-large)
</style>