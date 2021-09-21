<template>
  <div class="singerDetail">
    <!-- 简介 -->
    <div class="brief">
      <div class="title">{{ singerDetail.name }}简介</div>
      <p>{{ singerDetail.briefDesc }}</p>
    </div>
    <!-- 代表作 -->
    <div class="magunm">
      <div class="title">代表作品</div>
      <p>{{ DescDetail.introduction[0].txt }}</p>
    </div>
    <!-- 成就 -->
    <div class="achievement">
      <div class="title">主要成就</div>
      <p>{{ DescDetail.introduction[1].txt }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "NeteaseCloudMusicAlbum",
  props: {
    singerDetail: {
      type: Object,
      required: true,
    },
    DescDetail: {
      type: Object,
      required: true,
    },
  },

  components: {},

  directives: {},

  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="less" scoped>
.singerDetail {
  .title {
    font-weight: 700;
  }
  p {
    text-indent: 2em;
    font-size: 18px;
    line-height: 2;
    margin-top: 20px;
    color: #333;
  }
  margin-top: 20px;

  .magunm {
    margin: 20px 0 30px 0;
  }
}
</style>