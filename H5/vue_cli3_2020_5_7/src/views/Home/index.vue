<template>
  <div class="page">
    <div class="content" v-scroll>
      首页内容区
      <router-link to="login">跳转</router-link>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Home",
  components: {},
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="less" scoped>
div {
  box-sizing: border-box;
}

// 页面容器
.page {
  display: flex;
  flex-direction: column;

  // 内容区
  .content {
    flex: 1;
    position: relative;
    overflow-y: auto;
  }
}
</style>
