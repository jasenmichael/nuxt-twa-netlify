<template>
  <div class="container">
    <div>
      <!-- <logo /> -->
      <h1 class="title">nuxt-netlify-identity</h1>
      <h2 class="subtitle">My polished Nuxt.js project</h2>

      <p v-if="!isLoggedIn">Log in with depi@mail-maker.net : password</p>

      <h3 v-if="isLoggedIn" class="greetings">
        Hello, authorized user! Go to your
        <nuxt-link to="/protected">protected page</nuxt-link>.
      </h3>
      <div class="links">
        <v-btn
          v-if="isLoggedIn"
          v-on:click="triggerNetlifyIdentityAction('logout')"
        >
          Logout
        </v-btn>
        <v-btn v-else v-on:click="triggerNetlifyIdentityAction('login')">
          Login
        </v-btn>
        <!-- <nuxt-link to="/protected" class="button--green">
          Protected Page
        </nuxt-link> -->
        <!-- <div v-if="!isLoggedIn" v-on:click="circumvent" class="button--green">
          Circumvent
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
// import Logo from '~/components/Logo.vue'
// import netlifyIdentity from 'netlify-identity-widget'
// import { mapActions, mapState } from 'vuex'

// netlifyIdentity.init({
//   namePlaceholder: 'username',
// })
// netlifyIdentity.on('init', (user) => console.log('init', user))
// netlifyIdentity.on('login', (user) => console.log('login', user))
// netlifyIdentity.on('logout', () => console.log('Logged out'))
// netlifyIdentity.on('error', (err) => console.error('Error', err))
// netlifyIdentity.on('open', () => console.log('Widget opened'))
// netlifyIdentity.on('close', () => console.log('Widget closed'))

export default {
//   components: {
//     Logo,
//   },
//   computed: {
//     ...mapState({
//       user: (state) => state.auth.user,
//       isLoggedIn: (state) => state.auth.loggedIn,
//     }),
//     // isLoggedIn() {
//     //     return this.$auth.loggedIn
//     // }
//   },
//   async mounted() {
//     let user = await netlifyIdentity.currentUser()
//     if (user && user.token.access_token) {
//       console.log('user== ', user.token.access_token)
//       this.setUser(user)
//     }
//   },
//   methods: {
//     ...mapActions({
//       setUser: 'setUser',
//     }),
//     triggerNetlifyIdentityAction(action) {
//       // login
//       if (action == 'login') {
//         netlifyIdentity.open(action)
//         netlifyIdentity.on(action, (user) => {
//           this.setUser(user)
//           netlifyIdentity.close()
//         })

//         // login
//       } else if (action == 'logout') {
//         this.setUser(null)
//         netlifyIdentity.logout()
//         // this.$router.push('/')
//       }
//     },
//   }
}
</script>
