<!--
   File: jobs.vue
   Project: job-ad

   Author: Denes Solti
-->

<template lang="pug">
infinite-scroll(top=".search" :render-next-page="nextPage" v-slot="{resetItems}")
  .search
    .job-search.has-icon(data-icon="domain")
      input(type="text" :placeholder="$resources.language.SEARCH_JOB_OR_COMPANY")
    .location-search.has-icon(data-icon="location_on")
      input(type="text" :placeholder="$resources.language.SEARCH_LOCATION")
    button.secondary(@click="resetItems" ref="searchButton") Search
  .job-holder
    job(v-for="job in jobs" :key="job.id")
</template>

<script>
import InfiniteScroll from "@/components/widgets/infinite-scroll.vue";
import Job from '@/components/widgets/job.vue';

export default {
  name: 'Jobs',
  components: {
    InfiniteScroll,
    Job
  },
  inject: ['api'],
  data() {
    return {
      jobs: [],
      currentPage: 0
    };
  },
  mounted() {
    this.$refs.searchButton.click();
  },
  methods: {
    async nextPage() {
      const fetchedPage = await this.api.listJobs({
        page: this.currentPage
      });
      if (!fetchedPage.length)
        return false;

      this.currentPage++;
      this.jobs = [...this.jobs, ...fetchedPage];
    }
  }
};
</script>

<style lang="sass" scoped>
.search
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

    &.job-search
      width: 20rem

    &.location-search
      width: 10rem

    > input
      border-bottom-left-radius: 0
      border-top-left-radius: 0
      height: 100%
      width: 100%

  @media (max-width: 50rem)
    flex-flow: column

    > .has-icon
      width: 20rem !important

    > *:not(:last-child)
      margin-right: 0
      margin-bottom: var(--margin-normal)

.job-holder
  display: flex
  flex-flow: column

  > .job
    margin-left: auto
    margin-right: auto
    margin-top: var(--margin-large)

    &:last-of-type
      margin-bottom: var(--margin-small)
</style>