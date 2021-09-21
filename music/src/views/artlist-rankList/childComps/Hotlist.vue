<template>
  <div class="hostlistitem">
    <el-card class="box-card">
      <div
        slot="header"
        class="clearfix"
        :style="{ background: bgc }"
        @click="onClick"
      >
        <div class="title">
          <div class="left">
            {{ hots.name.substr(0, 1) }}
          </div>
          <div class="right">
            <div class="text">{{ hots.name.substr(1) }}</div>
            <div class="time">{{ hots.createTime | relativeTime }}</div>
          </div>
        </div>
        <div class="icon">
          <div class="el-icon-video-play"></div>
        </div>
      </div>
      <tr
        v-for="(item, index) in musiclist"
        :key="index"
        @dblclick="itemClick(item)"
      >
        <td class="index">0{{ index + 1 }}</td>
        <td class="name">{{ item.album }}</td>
        <td class="songer">{{ item.artist }}</td>
      </tr>
    </el-card>
  </div>
</template>

<script>
import {
  getDetail,
  _getSongsDetail,
  songDetail,
  getSongURl,
} from "@/network/musicDetail";
export default {
  name: "NeteaseCloudMusicHotlist",
  props: {
    hots: {
      type: Object,
      required: true,
    },
    bgc: {
      type: String,
      default: "#5993e8",
    },
  },

  components: {},

  directives: {},

  data() {
    return {
      musicListDetail: null,
      musiclist: [],
    };
  },
  computed: {},
  created() {
    this.getDetails();
  },
  mounted() {},

  methods: {
    // 获取歌单详情
    getDetails() {
      getDetail(this.hots.id).then((res) => {
        this.musicListDetail = res.data;
        /**遍历查询歌单所有歌曲详情 */
        for (let i of this.musicListDetail.playlist.trackIds.slice(0, 8)) {
          _getSongsDetail(i.id).then((res) => {
            let song = new songDetail(res.data.songs);
            this.musiclist.push(song);
          });
        }
      });
    },
    // 点击跳转到对应歌单
    onClick() {
      this.$router.push(`/musiclistdetail/${this.hots.id}`);
    },
    async itemClick(item) {
      // 获取音乐url
      const { data } = await getSongURl(item.id);
      const url = data.data[0].url;
      const pic = item.pic;
      const name = item.name;
      const artist = item.artist;
      const songid = item.id;
      const player = { name, url, artist, pic };
      this.$store.dispatch("player", player);
      this.$store.commit("songid", songid);
    },
  },
};
</script>

<style lang="less" scoped>
.hostlistitem {
  margin: 10px 10px 30px 20px;
}
.box-card {
  width: 380px;
  /deep/ .el-card__header {
    padding: 0;
  }
  .clearfix {
    cursor: pointer;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 380px;
    height: 130px;
    background-color: #5993e8;
    color: #fff;
    .title {
      font-style: oblique;
      display: flex;

      align-items: center;
      .left {
        font-size: 54px;
        padding-bottom: 10px;
      }
      .right {
        margin-left: 15px;
        .text {
          font-size: 28px;
        }
        .time {
          font-size: 18px;
        }
      }
    }
    .icon {
      font-size: 50px;
    }
  }
  /deep/ .el-card__body {
    padding: 0;
    tr:nth-child(2n) {
      background-color: #f9f9f9;
    }
    tr {
      display: inline-block;
      width: 100%;
      padding: 5px 5px;
      display: flex;
      cursor: pointer;

      td:nth-child(1) {
        flex: 1;
      }
      td:nth-child(3) {
        flex: 2;
        text-align: right;
      }
      td {
        flex: 3;
        text-align: left;
      }
    }
    tr:nth-child(-n + 3) .index:nth-child(-n + 3) {
      color: #f27c6e;
    }
    tr:hover {
      background-color: #eee;
    }
  }
}
</style>