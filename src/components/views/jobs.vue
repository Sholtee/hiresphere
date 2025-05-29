<!--
   File: jobs.vue
   Project: job-ad

   Author: Denes Solti
-->
<template lang="pug">
infinite-scroll(top=".search" :render-next-page="nextPage" v-slot="{renderInitialItems}")
  .search(v-once)
    .has-icon(v-for="(input , cls) in searchInputs" :class="cls" :data-icon="input.icon")
      input(
        :placeholder="$resources.language[input.placeholder]"
        v-model="input.model"
        v-focus="input.focus"
        @keyup.enter="loadJobs"
      )
    button.secondary(@click="submitSearch(renderInitialItems)" ref="searchButton") {{$resources.language.SEARCH}}
  .job-holder
    job(v-for="job in jobs" :key="job.id" :job="job")
      template(v-slot:buttons)
        button.primary(@click="$router.push({name: 'Job', params: {jobId: job.id}})")
          | {{$resources.language.MORE_DETAILS}}
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
  inject: ['api', 'setTitle'],
  setup() {
    // data that don't need to be reactive
    return {
      searchParams: {},
      searchInputs: {
        'job-or-company': {
          icon: 'domain',
          placeholder: 'SEARCH_JOB_OR_COMPANY',
          model: '',
          focus: true
        },
        'location': {
          icon: 'location_on',
          placeholder: 'SEARCH_LOCATION',
          model: ''
        }
      }
    };
  },
  data() {
    return {
      jobs: []
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
      this.searchParams = {
        jobOrCompany: this.searchInputs['job-or-company'].model,
        location: this.searchInputs['location'].model,
        page: 0
      };

      this.jobs = [];

      // wait the DOM cleanup to be done
      await this.$nextTick();

      renderInitialItems();
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

    &.job-or-company
      width: 20rem

    &.location
      width: 10rem

    > input
      border-bottom-left-radius: 0
      border-top-left-radius: 0
      height: 100%
      width: 100%

  +media-max-width-50
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