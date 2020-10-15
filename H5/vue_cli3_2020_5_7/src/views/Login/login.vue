<template>
  <div class="page">
    <div
      class="content"
      :style="{ backgroundImage: `url(${backgroundImage})` }"
    >
      <div @click="changeLangs">{{ $t("login.changeLangBtn") }}</div>

      <footer class="footer">
        <button class="button" @click.stop="linkToPage('/')">
          我要成为经销商
        </button>
        <button class="button active" @click.stop="linkToPage('/')">
          登录
        </button>
      </footer>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "Login",
  data() {
    return {
      backgroundImage: "",
    };
  },
  mounted() {
    // this.backgroundImage =
    //   "https://yshu.oss-cn-shanghai.aliyuncs.com/uploads/bg_banner/594990b9-d549-4972-81e0-b740216e5968.png";
    this.queryBg();
  },
  methods: {
    // 获取背景图
    queryBg() {
      this.$Api.HomeApi.getBg().then((res) => {
        this.backgroundImage = res.data;
      });
    },

    // 路由跳转
    linkToPage(path, query) {
      this.$router.push({
        path,
        query,
      });
    },

    // 切换语言
    changeLangs() {
      let lang = this.$i18n.locale;
      if (lang == "zh") {
        this.$i18n.locale = "en";
      } else {
        this.$i18n.locale = "zh";
      }
    },
  },
};
</script>

<style lang="less" scoped>
@import "~@/assets/style/var.less";

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

    background-size: 100% 100%;
    background-repeat: no-repeat;
    background-position: center;

    .footer {
      box-sizing: border-box;
      position: absolute;
      bottom: 116px;
      left: 0;
      width: 100%;
      display: flex;
      justify-content: space-between;
      padding: 0 32px;

      .button {
        box-sizing: border-box;
        width: 330px;
        height: 88px;
        line-height: 88px;
        border: 2px solid rgba(18, 18, 18, 1);
        font-size: 28px;
        text-align: center;
        color: #121212;
        background: rgba(255, 255, 255, 1);
        border-radius: 10px;
        &.active {
          background: @brand-green-color;
          color: #ffffff;
        }
      }
    }
  }
}
</style>