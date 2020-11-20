export const state = () => ({
  user: JSON.parse(window.localStorage.getItem('user'))
});

export const mutations = {
  SET_USER(state, user) {
    if (!user) {
      state.user = null;
      window.localStorage.removeItem('user');
      return;
    }
    let theUser = JSON.stringify(user);
    state.user = user;
    window.localStorage.setItem('user', theUser);
  }
};

export const actions = {
  setUser: ({ commit }, payload) => {
    commit('SET_USER', payload)
  }
};
