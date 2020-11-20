export const state = () => ({
//   user: JSON.parse(window.localStorage.getItem('gotrue.user') || null),
//   auth: null
})

export const mutations = {
  SET_USER(user) {
    if (!user) {
    //   state.user = null;
    //   window.localStorage.removeItem('user')
      this.$auth.logout()
      return;
    }
    // let theUser = JSON.stringify(user);
    // state.user = user;
    // window.localStorage.setItem('user', theUser);
    let theUser = JSON.parse(window.localStorage.getItem('gotrue.user') || null)
    console.log('theuser', theUser)
    this.$auth.setUser(theUser)
    this.$auth.setUserToken(theUser.token.access_token)
    // this.$auth.setUserToken(this.user.token.access_token)
  }
};

export const actions = {
  setUser: ({
    commit
  }, payload) => {
    commit('SET_USER', payload)
  }
}


console.log('do stuff in store init...')
