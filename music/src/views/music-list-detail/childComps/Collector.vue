<template>
  <div class="collect">
    <div class="users" v-for="(item, index) in subscribers" :key="index">
      <div class="user">
        <img :src="item.avatarUrl" alt="" />
        <div class="name">{{ item.nickname }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getSub } from "@/network/comment";
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  name: "NeteaseCloudMusicSonglist",

  components: {},

  directives: {},

  data() {
    return {
      subscribers: [],
    };
  },
  created() {
    this.getSub();
  },
  mounted() {},

  methods: {
    async getSub() {
      const { data } = await getSub(this.id);
      this.subscribers = data.subscribers;
    },
  },
};
</script>

<style lang="less" scoped>
.collect {
  display: flex;
  flex-wrap: wrap;
  .user {
    padding: 20px 20px;
    text-align: center;

    img {
      width: 50px;
      height: 50px;
      border-radius: 100%;
    }
    .name {
      font-size: 12px;
    }
  }
}
</style>