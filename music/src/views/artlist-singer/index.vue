<template>
  <!-- 歌手 -->
  <div class="singer">
    <div class="head">
      <!-- 语种 -->
      <div class="language">
        <div>语种：</div>
        <ul>
          <li
            :style="{ color: item.value === area ? '#2D8CF1' : '' }"
            v-for="item in areas"
            :key="item.value"
            @click="languageClick(item.value)"
          >
            {{ item.content }}
          </li>
        </ul>
      </div>
      <!-- 分类 -->
      <div class="classify">
        <div>分类：</div>
        <ul>
          <li
            :style="{ color: item.value === type ? '#2D8CF1' : '' }"
            v-for="item in types"
            :key="item.value"
            @click="classifyClick(item.value)"
          >
            {{ item.content }}
          </li>
        </ul>
      </div>
      <!-- 筛选 -->
      <div class="screen">
        <div>筛选：</div>
        <ul>
          <li
            :style="{ color: item.value === initial ? '#2D8CF1' : '' }"
            v-for="item in Fnames"
            :key="item.value"
            @click="screenClick(item.value)"
          >
            {{ item.content }}
          </li>
        </ul>
      </div>
    </div>
    <div class="content">
      <!-- 歌手列表组件 -->
      <singer-item :artists="artists"></singer-item>
    </div>
    <!-- 分页器 -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="1000"
      @next-click="nextClick"
      @prev-click="prevClick"
      @current-change="currentChange"
    >
    </el-pagination>
  </div>
</template>

<script>
// 引入网络请求方法
import { _getArtist } from "@/network/artist";
import { areas, types, Fnames } from "./data";

//引入歌手列表组件
import SingerItem from "./childComps/SingerItem.vue";

export default {
  name: "NeteaseCloudMusicIndex",

  components: {
    SingerItem, //歌手列表组件
  },

  directives: {},

  data() {
    return {
      areas, //语种
      types, //类型
      Fnames, //26字母
      limit: 30, //返回数量
      offset: 1, //页数
      initial: -1, //按首字母索引查找参数,
      type: -1, //歌手性别，-1是全部,1:男歌手,2:女歌手,3:乐队
      area: -1, //歌曲语言 -1:全部,7华语,96欧美,8:日本,16韩国,0:其他
      artists: [], //歌手列表
    };
  },
  created() {
    // 获取歌手数据
    this.getArtist();
  },

  mounted() {},

  methods: {
    // 获取歌手数据
    async getArtist() {
      const limit = this.limit;
      const offset = this.offset;
      const initial = this.initial;
      const type = this.type;
      const area = this.area;
      const { data } = await _getArtist(area, type, initial, limit, offset);
      this.artists = data.artists;
    },
    // 语种的点击事件
    languageClick(value) {
      this.area = value;
      this.getArtist();
    },
    // 分类的点击事件
    classifyClick(value) {
      this.type = value;
      this.getArtist();
    },
    // 筛选的点击事件
    screenClick(value) {
      this.initial = value;
      this.getArtist();
    },
    // 上一页
    prevClick() {
      if (this.offset > 1) {
        this.offset--;
        this.getArtist();
      } else {
        return;
      }
    },
    // 下一页
    nextClick() {
      this.offset++;
      this.getArtist();
    },
    // 跳转页
    currentChange(index) {
      this.offset = index;
      this.getArtist();
    },
  },
};
</script>

<style lang="less" scoped>
.singer {
  ul {
    display: flex;
    li {
      cursor: pointer;
      margin: 0 20px;
      font-size: 18px;
    }
    li:hover {
      color: #2d8cf1;
    }
  }
  .head {
    .language {
      display: flex;
    }
    .classify {
      display: flex;
      margin: 15px 0;
    }
    .screen {
      display: flex;
      ul {
        li {
          margin: 0 10px;
        }
      }
    }
  }
  .el-pagination {
    text-align: center;
    margin: 20px 0;
    transform: translateX(-10%);
  }
}
</style>