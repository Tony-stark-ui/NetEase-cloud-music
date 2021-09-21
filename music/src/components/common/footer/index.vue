<template>
  <div class="footer">
    <song-detail
      ref="songDetail"
      class="detail"
      :allList="allList"
    ></song-detail>
    <audio-player
      ref="audioPlayer"
      :audio-list="allList.map((elm) => elm.url)"
      :before-play="handleBeforePlay"
      theme-color="#000000"
      @pause="pause"
      @play="play"
      @timeupdate="timeupdate"
    />
  </div>
</template>

<script>
import SongDetail from "./childComps/SongDetail.vue";

import { mapState } from "vuex";
export default {
  data() {
    return {
      currentAudioName: "",
      audioList: [
        {
          name: "",
          url: "",
        },
      ],
    };
  },
  components: {
    SongDetail,
  },
  created() {},
  watch: {},
  computed: {
    ...mapState(["audioMusic", "allList"]),
  },

  methods: {
    // 播放前做的事
    handleBeforePlay(next) {
      this.currentAudioName =
        this.allList[this.$refs.audioPlayer.currentPlayIndex].name;

      next(); // 开始播放
    },
    // 播放暂停
    pause() {
      this.$store.commit("pause");
    },
    // 播放开始
    play() {
      this.$store.commit("play");
    },
    // 播放时间
    timeupdate(e) {
      const currentTime = e.target.currentTime;
      this.$store.commit("currentTime", currentTime);
      this.$bus.$emit("timeupdate");
    },
  },
};
</script>
<style lang="less" scoped>
.footer {
  background-color: #f9f9f9;
  position: relative;
}

.detail {
  position: absolute;
  left: 10px;
  top: -70px;
}
/deep/ .audio__btn-wrap {
  z-index: 9;
}
</style>