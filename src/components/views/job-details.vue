<!--
   File: job-details.vue
   Project: HireSphere

   Author: Denes Solti
-->

<template lang="pug">
.job-holder
  .material-icons.warning(v-if="job === false")
  job(v-if="job" :job="job" expanded)
    template(v-slot:buttons)
      button.secondary(@click="$router.go(-1)") {{$resources.language.BACK}}
      button.primary(@click="console.log('applied')" v-if="currentUser.isAnonymous") {{$resources.language.APPLY}}
      button.has-icon.primary(data-icon="edit" @click="console.log('edited')") {{$resources.language.EDIT}}
</template>

<script>
import Job from '@/components/widgets/Job.vue';

export default {
  name: 'JobDetails',
  components: {
    Job
  },
  inject: ['currentUser', 'setTitle'],
  data() {
    return {
      job: null
    };
  },
  async beforeMount() {
    try {
      const job = await this.$api.getJob(this.$route.params.jobId);

      this.job = job;
      this.setTitle(job.name);
    } catch {
      this.job = false;
    }
  }
};
</script>

<style lang="sass" scoped>
.job-holder
  width: 100%
  display: flex
  flex-flow: column

  > *
    margin-left: auto
    margin-right: auto
    margin-top: var(--margin-large)

  > .warning
    font-size: 10rem
    color: rgba(201,201,201,0.74)
</style>