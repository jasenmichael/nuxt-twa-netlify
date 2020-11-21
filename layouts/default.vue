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
      <!-- / -->
      <pre>$auth.loggedIn: {{ $auth.loggedIn || false }}</pre>
      <!-- <pre>$state.user: {{ user }}</pre> -->
      <pre>$auth.user: {{ $auth.user || false }}</pre>
      <!-- / -->
      <v-container>
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
        <!-- <span>&copy; {{ new Date().getFullYear() }}</span> -->
      </div>
    </v-footer>
  </v-app>
</template>

<script>
// import { mapState, mapActions } from 'vuex'

import netlifyIdentity from 'netlify-identity-widget'

// netlifyIdentity.on('init', (user) => console.log('init', user))
// netlifyIdentity.on('login', (user) => console.log('login', user))
// netlifyIdentity.on('logout', () => console.log('Logged out'))
// netlifyIdentity.on('error', (err) => console.error('Error', err))
// netlifyIdentity.on('open', () => console.log('Widget opened'))
// netlifyIdentity.on('close', () => console.log('Widget closed'))

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
    netlifyIdentity.init({
      namePlaceholder: 'username',
    })
    console.log('init identiy')
  },
  async mounted() {
    let currentUser = await netlifyIdentity.currentUser()
    if (currentUser && currentUser.token.access_token) {
      this.$auth.setUserToken(currentUser.token.access_token)
      this.$auth.setUser(currentUser)
    }
  },
  computed: {
    // ...mapState(['user']),
    // user() {
    //   return this.$store.state.user
    // },
    isLoggedIn() {
      return this.$auth.loggedIn
    },
  },
  methods: {
    // ...mapActions({
    //   setUser: 'setUser',
    // }),
    triggerNetlifyIdentityAction(action) {
      // login
      if (action == 'login') {
        netlifyIdentity.open(action)
        netlifyIdentity.on(action, (user) => {
          // this.setUser('login')
          this.$auth.setUser(user)
          netlifyIdentity.close()
        })
        // logout
      } else if (action == 'logout') {
        // this.setUser()
        this.$auth.logout()
        // this.setUser('logout')
        netlifyIdentity.logout()
        // this.$router.push('/')
      } else if (action == 'init') {
        console.log('init identity widget')
      }
    },
  },
}
</script>
