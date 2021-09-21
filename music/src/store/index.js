import Vue from 'vue'
import Vuex from 'vuex'

// /导入封装好的本地存储数据的方法
import { getItem, setItem, removeItem } from '@/utils/storage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: getItem('user'),
    audioMusic: {},//歌曲url
    allList: [],//全部播放列表
    loading: false,//全局loading
    play: false,//播放状态
    id: null,//歌曲id
    currentTime: null//歌曲播放时间
  },
  mutations: {
    setUser(state, data) {
      state.user = data

      //简化版往本地存储存数据
      setItem('user', state.user)
    },
    // 存入歌曲url
    setUrl(state, audioList) {
      state.audioMusic = audioList
    },
    // 全部播放列表
    allList(state, allList) {
      state.allList = allList
    },
    pushList(state, obj) {
      state.allList.unshift(obj)
    },
    // 开启loading
    loading(state) {
      state.loading = true
    },
    // 关闭loading
    closeLoading(state) {
      state.loading = false
    },
    // 播放状态
    play(state) {
      state.play = true
    },
    pause(state) {
      state.play = false
    },
    // 歌曲id
    songid(state, id) {
      state.id = id
    },
    // 存入歌曲播放时间
    currentTime(state, time) {
      state.currentTime = time
    }
  },
  actions: {
    //这里通过action异步传递参数会好一点
    actionsSetUser(context, data) {
      context.commit('setUser', data)
    },
    // 歌曲url
    setMusicUrl(context, audioList) {
      context.commit('setUrl', audioList)
    },
    // 播放全部音乐列表
    playList(context, playList) {
      context.commit('allList', playList)
    },
    player(context, obj) {
      context.commit('pushList', obj)
    }
  },
  modules: {
  }
})
