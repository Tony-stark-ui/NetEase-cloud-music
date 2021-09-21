<template>
  <div class="newWestMusic">
    <h4>最新音乐</h4>
    <div class="newMusic">
      <div
        class="newMusic-item"
        v-for="(item, index) in newMusic"
        :key="index"
        @dblclick="playerMusic(item.id)"
      >
        <div class="left-num">
          {{ index + 1 }}
        </div>
        <div class="center-img">
          <img :src="item.picUrl" alt="" />
          <i class="el-icon-video-play playIcon"></i>
        </div>
        <div class="right-title">
          <div class="name">
            {{ item.name }}
          </div>
          <div class="text">
            {{ item.song.album.company }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getSongURl, _getSongsDetail, songDetail } from "@/network/musicDetail";

import { mapState } from "vuex";
export default {
  name: "NeteaseCloudMusicNewwestmusic",
  props: {
    newMusic: {
      type: Array,
      required: true,
    },
  },
  computed: {
    ...mapState(["url", "allList"]),
  },

  components: {},

  directives: {},

  data() {
    return {
      id: null,
      url: "",
      musicDetail: {},
    };
  },
  created() {
    this.playerMusic();
  },
  mounted() {},

  methods: {
    // 双击播放音乐
    async playerMusic(id) {
      this.id = id;
      this.getSongsDetail();
    },
    // 获取歌曲信息
    async getSongsDetail() {
      const { data } = await _getSongsDetail(this.id);
      let song = new songDetail(data.songs);
      this.musicDetail = song;
      console.log(this.musicDetail);

      const res = await getSongURl(this.id);
      this.url = res.data.data[0].url;

      const name = this.musicDetail.name;
      const artist = this.musicDetail.artist;
      const pic = this.musicDetail.pic;
      const url = this.url;
      const player = { name, url, artist, pic };
      const songId = this.id;
      this.$store.dispatch("player", player);
      this.$store.commit("songid", songId);
    },
  },
};
</script>

<style lang="less" scoped>
.newWestMusic {
  margin-top: 20px;
  cursor: pointer;

  .newMusic {
    display: flex;
    flex-wrap: wrap;
    border-top: 1px solid #b8b6b6;
    .newMusic-item {
      width: 50%;
      display: flex;
      margin: 15px 0 5px 0;

      img {
        width: 75px;
        height: 75px;
      }
      .left-num {
        display: flex;
        align-items: flex-end;
      }
      .center-img {
        position: relative;
        color: aliceblue;
        font-size: 20px;
        margin: 0px 15px;
        .playIcon {
          position: absolute;
          top: 50%;
          right: 40%;
          transform: translateY(-55%);
          z-index: 2;
        }
      }
      .right-title {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
      }
    }
  }
}
</style>