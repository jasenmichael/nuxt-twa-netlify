<template>
  <v-app dark>
    <h1 v-if="error.statusCode === 404">
      {{ pageNotFound || '' }}
    </h1>
    <h1 v-else>
      {{ otherError || '' }}
    </h1>
    <NuxtLink to="/"> Home page </NuxtLink>
    <!-- <pre>{{ $nuxt.$route.path }}</pre>
    <pre>{{ error }}</pre> -->
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      pageNotFound: null,
      otherError: null,
    }
  },
  beforeCreate() {
    let pathsToRedirect = [
      'photos',
      'articles',
      'blog',
      'music',
      'events',
      'videos',
    ]
    let path = this.$nuxt.$route.path.split('/')
    if (pathsToRedirect.includes(path[1]) && path[2]) {
      this.$router.push('/' + path[1] + '?q=' + path[2])
    }
  },
  created() {
    this.pageNotFound = '404 Not Found'
    this.otherError = 'An error occurred'
  },
  head() {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title,
    }
  },
}
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
