import Vue from 'vue'
import Vuex from 'vuex'
import Api from '@/plugins/axios'

Vue.use(Vuex)

const mutations = {

  // 更新用户信息
  updateUserInfo(state) {
    let userInfo = sessionStorage.getItem('user');
    userInfo = (userInfo && JSON.parse(userInfo)) || {};
    state.userInfo = userInfo;
  },
};

const getters = {

  // 用户信息
  userInfo(state) {
    return state.userInfo;
  },

};

const actions = {

  // 获取用户信息
  async queryUserInfo({
    commit
  }) {
    const res = await Api.get('/user/get_user_info', {});
    if (res.code === 0) {
      sessionStorage.setItem('user', JSON.stringify(res.data))
      commit('updateUserInfo');
    }
  }

};

const modules = {

}


export default new Vuex.Store({
  state: {
    userInfo: {},
  },
  mutations,
  getters,
  actions,
  modules,
})