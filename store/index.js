















// export const state = () => ({
// //   user: {}
// })

// export const mutations = {
//   SET_USER(state, payload) {
//     console.log('SET_USER mutation payload', payload)
//     if (payload.email && payload.token) {
//       state.user = payload
//       this.$auth.setUserToken(state.user.token.access_token)
//       this.$auth.setUser(payload)
//       return
//     }
//     state.user = null
//     this.$auth.logout()
//   }
// }

// export const actions = {
//   setUser: ({
//     commit
//   }, payload) => {
//     console.log('setPayload action payload', payload)
//     payload === 'login' ?
//       commit('SET_USER', JSON.parse(window.localStorage.getItem('gotrue.user') || null)) :
//       commit('SET_USER', {})
//   }
// }
