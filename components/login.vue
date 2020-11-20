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
import Logo from '~/components/Logo.vue'
import netlifyIdentity from 'netlify-identity-widget'
import GoTrue from 'gotrue-js';
import { mapActions, mapState } from 'vuex'

let gotrue = new GoTrue({
  APIUrl: 'https://nuxt-twa-netlify.netlify.app/.netlify/identity',
  audience: '',
  setCookie: false,
});

netlifyIdentity.init()
netlifyIdentity.on('init', user => console.log('init', user));
netlifyIdentity.on('login', user => console.log('login', user));
netlifyIdentity.on('logout', () => console.log('Logged out'));
netlifyIdentity.on('error', err => console.error('Error', err));
netlifyIdentity.on('open', () => console.log('Widget opened'));
netlifyIdentity.on('close', () => console.log('Widget closed'));


export default {
  components: {
    Logo,
  },
  computed: mapState({
    isLoggedIn: (state) => state.user,
  }),
  async beforeMount() {
    let user = await netlifyIdentity.currentUser()
    if (user && user.token.access_token) {
      console.log('user== ', user.token.access_token)
      this.setUser(user)
    }
  },
  methods: {
    ...mapActions({
      setUser: 'setUser',
    }),
    // circumvent() {
    //   window.localStorage.setItem('user', true)
    //   location.reload(true)
    // },
    triggerNetlifyIdentityAction(action) {
      if (action == 'login' || action == 'signup') {
        console.log('login')
        netlifyIdentity.open(action)

        netlifyIdentity.on(action, (user) => {
          this.setUser(user)
          netlifyIdentity.close()
        console.log('----')
        })

      } else if (action == 'logout') {
        this.setUser(null)
        netlifyIdentity.logout()
        this.$router.push('/')
      }
    },
  },
}
</script>

<style>
/* .container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
  line-height: 1;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.greetings {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-weight: 400;
  margin: 1.5rem 0;
}

.links {
  padding-top: 15px;
} */
</style>
