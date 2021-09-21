<template>
  <div class="detail">
    <div class="main">
      <div class="center">
        <!-- 关闭按钮 -->
        <div class="close" @click="$emit('close')">
          <div class="el-icon-s-fold"></div>
        </div>
        <!-- 歌曲部分 -->
        <div class="song">
          <img class="dian" src="../../../../assets/下载.png" alt="" />
          <div class="animatino">
            <div class="playbar" :class="play ? 'trb' : 'tra'">
              <img
                class="gun"
                src="../../../../assets/play-bar.e5a7a142.png"
                alt=""
              />
            </div>
            <div class="cover">
              <img class="roa" :src="allList[0].pic" alt="" />
            </div>
          </div>
          <div class="liric">
            <h1>{{ allList[0].name }}</h1>
            <p>{{ allList[0].artist }}</p>
            <div class="liricitem">
              <ul ref="lyricUL">
                <li
                  v-for="(item, i) in lyricsObjArr"
                  :key="item.uid"
                  ref="lyric"
                  :style="{ color: lyricIndex === i ? '#2D8CF0' : '#000' }"
                  :data-index="i"
                >
                  {{ item.lyric }}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <!-- 评论部分 -->
        <div class="comment">
          <comment
            :id="id"
            :comments="comments"
            @nextPag="nextPag"
            @prevPag="prevPag"
          ></comment>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { getLyric, musicRecommend } from "@/network/comment";
import Comment from "./Comment.vue";
export default {
  name: "NeteaseCloudMusicMusicdetail",
  props: {
    allList: {
      type: Array,
      required: true,
    },
  },
  computed: {
    ...mapState(["play", "id", "currentTime"]),
  },

  components: { Comment },

  directives: {},

  data() {
    return {
      lrc: {},
      lyricsObjArr: [],
      lyricIndex: null,
      limit: 20,
      offset: 1,
      comments: [], //评论列表
    };
  },
  created() {
    this.getLyric();
    // 获取评论信息
    this.musicRecommend();
  },
  mounted() {
    this.$bus.$on("timeupdate", () => {
      if (this.play) {
        this.matching();
      }
    });
  },

  methods: {
    // 获取评论信息
    async musicRecommend() {
      const { data } = await musicRecommend(this.id, this.limit, this.offset);
      this.comments = data.comments;
    },
    // 解析时间函数
    formatLyricTime(time) {
      // 格式化歌词的时间 转换成 sss:ms
      const regMin = /.*:/;
      const regSec = /:.*\./;
      const regMs = /\./;

      const min = parseInt(time.match(regMin)[0].slice(0, 2));
      let sec = parseInt(time.match(regSec)[0].slice(1, 3));
      const ms = time.slice(
        time.match(regMs).index + 1,
        time.match(regMs).index + 3
      );
      if (min !== 0) {
        sec += min * 60;
      }
      return Number(sec + "." + ms);
    },
    async getLyric() {
      const { data } = await getLyric(this.id);
      this.lrc = data.lrc.lyric;

      // 解析歌词，拿到每一行歌词
      const regNewLine = /\n/;
      const linneArr = this.lrc.split(regNewLine);
      // 分隔事件和歌词
      const regTime = /\[\d{2}:\d{2}.\d{2,3}\]/;
      // 歌词数组遍历
      linneArr.forEach((item) => {
        if (item === "") {
          return;
        }
        const obj = {};
        const time = item.match(regTime);
        obj.lyric =
          item.split("]")[1].trim() === "" ? "" : item.split("]")[1].trim();
        obj.time = time
          ? this.formatLyricTime(time[0].slice(1, time[0].length - 1))
          : 0;
        if (obj.lyric == "") {
          console.log("这里没有歌词");
        } else {
          this.lyricsObjArr.push(obj);
        }
      });
    },
    // 匹配歌词
    matching() {
      // 匹配歌词
      for (let i = 0; i < this.lyricsObjArr.length; i++) {
        if (this.currentTime > parseInt(this.lyricsObjArr[i].time)) {
          const index = this.$refs.lyric[i].dataset.index;
          if (i === parseInt(index)) {
            this.lyricIndex = i;
            this.$refs.lyricUL.style.transform = `translateY(${
              170 - 30 * (i + 1)
            }px)`;
            this.$refs.lyricUL.style.transition = "all 1s";
          }
        }
      }
    },
    // 上一页评论
    prevPag() {
      if (this.offset > 1) {
        this.offset--;
      }
      this.musicRecommend();
    },
    // 下一页评论
    nextPag(index) {
      if (index) {
        this.offset = index;
      } else {
        this.offset++;
      }

      this.musicRecommend();
    },
  },
};
</script>

<style lang="less" scoped>
.detail {
  .main {
    position: absolute;
  }
  .center {
    position: absolute;
    width: 1400px;
    height: 100%;
    background-color: #fff;
    margin: 0 auto;
  }
  .close {
    cursor: pointer;
    padding: 5px 10px;
    position: absolute;
    right: 0;
    font-size: 30px;
    color: #fff;
    background-color: #ffc633;
  }
  .song {
    display: flex;
    background: radial-gradient(closest-side, #928e8d, #fff);
    // overflow-y: auto;
    // height: 400px;
    .dian {
      position: absolute;
      z-index: 4;
      top: 0;
      left: 355px;
      width: 30px;
      height: 30px;
    }
    .animatino {
      flex: 1;
      display: flex;
      position: relative;
      .playbar {
        z-index: 3;
        position: absolute;
        left: 50%;
        transform: rotate(-30deg);
        transition: all 0.4s;

        .gun {
          position: absolute;
          top: 23px;
          left: 10px;
          width: 140px;
          height: 140px;
        }
      }
      .cover {
        position: absolute;
        left: 25%;
        top: 80px;
        width: 300px;
        height: 300px;
        border-radius: 100%;
        background-color: black;
        display: flex;
        justify-content: center;
        align-items: center;
        img {
          width: 200px;
          height: 200px;
          border-radius: 100%;
          transition: all 3s;
        }
      }
      .tra {
        transform: rotate(-30deg);
      }
      .trb {
        transform: rotate(10deg);
      }

      .roa {
        animation: router 8s linear infinite backwards;
      }
    }
    .liric {
      flex: 1;
      text-align: left;
      height: 400px;
      overflow-y: auto;
      h1 {
        font-weight: 400;
      }
      p {
        margin: 5px 0 15px 0;
      }
      .liricitem {
        height: 360px;
        overflow-y: auto;

        li {
          margin: 15px 0;
        }
      }
    }
  }
  @keyframes router {
    0% {
      transform: rotate(0);
    }

    100% {
      transform: rotate(-360deg);
    }
  }
}
</style>