<template>
  <div>
    <el-table
      ref="singleTable"
      :data="musicList"
      highlight-current-row
      style="width: 100%"
      @cell-dblclick="isPlay"
    >
      <el-table-column type="index" width="50">
        <template v-if="isPlayer"><i class="el-icon-headset"></i></template>
      </el-table-column>
      <el-table-column type="index" property="" prop label="操作" width="70">
        <template slot-scope="scope">
          <div class="cover">
            <div class="icon">
              <div class="el-icon-caret-right"></div>
            </div>
            <img :src="scope.row.artists[0].picUrl" alt="" />
          </div>
        </template>
      </el-table-column>
      <el-table-column property="name" label="音乐标题" width="250">
      </el-table-column>
      <el-table-column property="artists[0].name" label="歌手">
      </el-table-column>
      <el-table-column property="album.company" label="工作室">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
// 引入网络请求方法
import { getSongURl } from "@/network/musicDetail";

import { mapState } from "vuex";
export default {
  name: "NeteaseCloudMusicSonglist",
  props: {
    musicList: {
      type: Array,
      required: true,
    },
  },

  components: {},
  computed: {
    ...mapState(["url", "allList"]),
  },

  directives: {},

  data() {
    return {
      isPlayer: false,
      isCollect: false,
      index: null,
      id: null,
    };
  },

  mounted() {},

  methods: {
    // 点击收藏
    Collect(index) {
      this.isCollect = !this.isCollect;
      if (this.isCollect) {
        this.index = index;
      } else {
        this.index = null;
      }
    },
    // 点击播放
    async isPlay(row) {
      // 获取音乐url
      const { data } = await getSongURl(row.id);
      const url = data.data[0].url;
      const name = row.name;
      console.log(row);
      const artist = row.artists[0].name;
      const pic = row.artists[0].picUrl;
      const songid = row.id;
      const player = { name, url, artist, pic };
      this.$store.dispatch("player", player);
      this.$store.commit("songid", songid);

      for (let index = 0; index < this.allList.length; index++) {
        if (this.allList[index].id === row.id) {
          this.isPlayer = true;
        }
      }
    },
  },
};
</script>

<style lang="less" scoped>
img {
  width: 50px;
  height: 50px;
}
.cover {
  position: relative;
  .icon {
    position: absolute;
    color: red;
    font-size: 22px;
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 100%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -60%);
  }
}
.el-icon-star-on {
  font-size: 18px;
  color: #2d8cf0;
}
.el-icon-star-off {
  font-size: 18px;
}
.el-icon-headset {
  font-size: 18px;
  color: #2d8cf0;
}
/deep/ td {
  cursor: pointer !important;
}
</style>