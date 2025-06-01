<!--
   File: jobs.vue
   Project: HireSphere

   Author: Denes Solti
-->
<template lang="pug">
infinite-scroll.jobs(top=".search" :render-next-page="nextPage" v-slot="{renderInitialItems}")
  .search(v-once)
    input-box.job-or-company(v-model="jobOrCompany"
      icon="domain" :placeholder="$resources.language.SEARCH_JOB_OR_COMPANY" @keyup.enter="loadJobs" focus)
    input-box.location(v-model="location"
      icon="location_on" :placeholder="$resources.language.SEARCH_LOCATION" @keyup.enter="loadJobs")
    button.secondary(@click="submitSearch(renderInitialItems)" ref="searchButton") {{$resources.language.SEARCH}}
  .job-holder
    job(v-for="job in jobs" :key="job.id" :job="job")
      template(v-slot:buttons)
        button.primary(@click="$router.push({name: 'Job', params: {jobId: job.id}})")
          | {{$resources.language.MORE_DETAILS}}
</template>

<script>
import InfiniteScroll from "@/components/widgets/infinite-scroll.vue";
import InputBox from "@/components/widgets/input-box.vue";
import Job from '@/components/widgets/job.vue';

export default {
  name: 'Jobs',
  components: {
    InputBox,
    InfiniteScroll,
    Job
  },
  inject: ['api', 'setTitle'],
  setup() {
    // data that don't need to be reactive
    return {
      searchParams: {}
    };
  },
  data() {
    return {
      jobs: [],
      jobOrCompany: '',
      location: ''
    };
  },
  beforeMount() {
    this.setTitle(this.$resources.language.TITLE_JOBS);
  },
  mounted() {
    this.loadJobs();
  },
  methods: {
    async nextPage() {
      const fetchedPage = await this.api.listJobs(this.searchParams);
      if (!fetchedPage.length)
        return false;

      this.searchParams.page++;
      this.jobs = [...this.jobs, ...fetchedPage];

      return true;
    },
    async submitSearch(renderInitialItems) {
      const {jobOrCompany, location} = this;

      // copy the filter so modifying them won't affect the paging
      this.searchParams = {
        jobOrCompany,
        location,
        page: 0
      };

      this.jobs = [];

      await renderInitialItems();
    },
    loadJobs() {
      this.$refs.searchButton.click();
    }
  }
};
</script>

<style lang="sass" scoped>
@use "@/styles/mixins" as *

.search
  display: flex
  padding: 1rem
  border: 1px solid var(--input-border-color)
  border-radius: var(--border-radius-small)
  height: max-content
  max-width: 90%
  width: max-content
  margin-left: auto
  margin-right: auto
  margin-top: var(--margin-normal)

  > *:not(:last-child)
    margin-right: var(--margin-normal)

    &.job-or-company
      width: 20rem

    &.location
      width: 10rem

  +media-max-width-55
    flex-flow: column

    > .input-holder
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