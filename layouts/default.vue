<template>
  <v-app dark>
    <v-navigation-drawer
      v-model="drawer"
      :mini-variant="miniVariant"
      :clipped="clipped"
      fixed
      app
    >
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
        >
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-btn icon @click.stop="miniVariant = !miniVariant">
        <v-icon>mdi-{{ `chevron-${miniVariant ? 'right' : 'left'}` }}</v-icon>
      </v-btn>
      <v-btn icon @click.stop="clipped = !clipped">
        <v-icon>mdi-application</v-icon>
      </v-btn>
      <v-btn icon @click.stop="fixed = !fixed">
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-spacer />

      <v-btn
        v-if="isLoggedIn"
        v-on:click="triggerNetlifyIdentityAction('logout')"
      >
        Logout
      </v-btn>
      <v-btn v-else v-on:click="triggerNetlifyIdentityAction('login')">
        Login
      </v-btn>
      <v-btn icon @click.stop="rightDrawer = !rightDrawer">
        <v-icon>mdi-menu</v-icon>
      </v-btn>
    </v-app-bar>
    <v-content>
      <v-container>
        <!-- / -->
        <pre>$auth.loggedIn: {{ isLoggedIn || false }}</pre>
        <pre>$auth.user.email: {{ user.email }}</pre>
        <!-- <pre>$auth.user: {{ $auth.user || false }}</pre> -->
        <!-- <pre>$auth.user.app_metadata.roles: {{ $auth.user.app_metadata.roles || false }}</pre> -->
        <!-- <pre>$auth.user.user_metadata.full_name: {{ $auth.user.user_metadata.full_name || false }}</pre> -->
        <!-- / -->
        <nuxt />
      </v-container>
    </v-content>
    <v-navigation-drawer v-model="rightDrawer" :right="right" temporary fixed>
      <v-list>
        <v-list-item @click.native="right = !right">
          <v-list-item-action>
            <v-icon light> mdi-repeat </v-icon>
          </v-list-item-action>
          <v-list-item-title>Switch drawer (click me)</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-footer :fixed="fixed" app>
      <div>
        <span>&copy; {{ new Date().getFullYear() }}</span>
      </div>
    </v-footer>
  </v-app>
</template>

<script>
import netlifyIdentity from 'netlify-identity-widget'

// netlifyIdentity.on('init', (user) => console.log('init', user))
// netlifyIdentity.on('login', (user) => console.log('Login', user))
// netlifyIdentity.on('logout', () => console.log('Logged out'))
// netlifyIdentity.on('error', (err) => console.error('Error', err))
// netlifyIdentity.on('open', () => console.log('Widget opened'))
netlifyIdentity.on('close', () => {
  console.log('Widget closed')
  // if (localStorage.hasOwnProperty('nf_jwt')) {
  if (
    localStorage.hasOwnProperty('gotrue.user') &&
    localStorage.getItem('auth._token.local') === false
  ) {
    console.log('has nf_jtw, reloading page')
    setTimeout(() => {
      // location.reload()
    }, 1000)
  }
})

export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire',
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'Vuetify.js',
    }
  },
  async beforeMount() {
    // init identity widget
    netlifyIdentity.init()
  },
  async mounted() {
    // console.log(this.$nuxt.redirect)
    // check if already loggedin
    let currentUser = await netlifyIdentity.currentUser()
    if (currentUser && currentUser.token.access_token) {
      // if logged in, set nuxt auth user and token, must set token before user!!
      this.$auth.setUserToken(currentUser.token.access_token)
      this.$auth.setUser(currentUser)
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.$auth.loggedIn
    },
    user() {
      return this.$store.$auth.user || false
    },
  },
  methods: {
    triggerNetlifyIdentityAction(action) {
      // login button clicked
      if (action == 'login') {
        // open identity widget
        netlifyIdentity.open(action)
        // now logged in
        netlifyIdentity.on('login', async (user) => {
          // set nuxt auth user and token, must set token before user!!
          // this.$auth.setUserToken(user.token.access_token)
          // this.$auth.setUser(user)

          let currentUser = await netlifyIdentity.currentUser()
          if (currentUser && currentUser.token.access_token) {
            // if logged in, set nuxt auth user and token, must set token before user!!
            this.$auth.setUserToken(currentUser.token.access_token)
            this.$auth.setUser(currentUser)
            // close identity widget

            netlifyIdentity.close()
          }
        })
        // logout button clicked, logout
      } else if (action == 'logout') {
        // logout netlify identity and nuxt auth
        netlifyIdentity.logout()
        this.$auth.logout()
      }
    },
  },
}
</script>
