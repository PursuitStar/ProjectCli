<template>
  <div class="components_code_item">
    <div class="title_box">
      <div class="title">{{ title }}</div>
      <img
        src="./img/public_icon_dailogclose@2x.png"
        alt=""
        class="close_icon"
        @click.stop="closeModal"
      />
    </div>
    <div class="content_box">
      <div class="text">短信验证码已发送至 {{ phone | phoneFilter }}</div>
      <div class="input_box">
        <div class="input">
          <div
            class="input_item"
            v-for="(item, index) in passwordList"
            :key="index"
          >
            <span v-if="!isSecret">{{ item.val }}</span>
            <span class="circle" v-else-if="isSecret && item.val"></span>
          </div>
        </div>
        <input
          class="hidden_input"
          :type="isIos() ? 'tel' : 'number'"
          maxlength="6"
          unselectable="on"
          v-model="password"
          v-input-dom
          v-fix-input
        />
      </div>
      <div class="tip">
        <span class="error">{{ tipText }}</span>
        <span class="send" v-if="timer > 0">{{ timer + "s" }}</span>
        <span class="send" @click.stop="sendCode" v-else>{{ sendText }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { isIos } from "@/utils/tool";

export default {
  props: {
    title: {
      // 标题
      type: String,
      require: false,
      default: "请输入短信验证码"
    },
    phone: {
      // 手机号
      type: String,
      require: true
    },
    tipText: {
      // 提示文本
      type: String,
      require: false,
      default: ""
    },
    isSecret: {
      //是否密文
      type: Boolean,
      require: false,
      default: false
    }
  },
  data() {
    return {
      passwordList: [
        { val: "" },
        { val: "" },
        { val: "" },
        { val: "" },
        { val: "" },
        { val: "" }
      ],
      password: "",
      sendText: "重新发送",
      timer: ""
    };
  },
  watch: {
    password(val) {
      let password = val.replace(/[^\d]/g, "");
      password = password.substring(0, 6);
      this.password = password;

      this.passwordList = this.passwordList.map((val, key) => {
        return { val: password[key] || "" };
      });

      if (password.length === 6) {
        this.$emit("checkCode", password); //向父组件传递校检请求
        this.resetInput();
      }
    }
  },
  filters: {
    // 手机号 加密
    phoneFilter(val) {
      let phone = "";
      if (val) {
        let front_phone = val.substring(0, 3);
        let end_phone = val.substring(7);
        phone = front_phone + "****" + end_phone;
      }
      return phone;
    }
  },
  mounted() {
    // 页面初始化请求验证码
    this.sendCode();
  },

  methods: {
    isIos,
    // 关闭模态框
    closeModal() {
      this.$emit("closeModal"); //向父组件传递关闭窗口请求
    },
    // 重置输入框
    resetInput() {
      this.password = "";
    },
    // 发送验证码
    sendCode() {
      //验证码定时器
      this.timer = 60;
      this.codeTimer();
      this.$emit("sendCode"); //向父组件传递发送请求
    },
    // 验证码定时器
    codeTimer() {
      let _this = this;
      let timer = setInterval(function() {
        let newTimer = _this.timer;
        if (newTimer > 0) {
          newTimer -= 1;
        } else {
          clearInterval(timer);
          newTimer = 0;
        }
        _this.timer = newTimer;
      }, 1000);
    }
  }
};
</script>

<style lang="less" scoped>
div {
  box-sizing: border-box;
}
.components_code_item {
  background: #ffffff;
  color: #121212;
  // 标题
  .title_box {
    position: relative;
    padding: 0 80px;
    border-bottom: 1px solid rgba(221, 221, 221, 1); /*no*/
    .title {
      line-height: 100px;
      font-size: 28px;
      font-weight: 600;
      text-align: center;
    }
    .close_icon {
      position: absolute;
      width: 28px;
      height: 28px;
      right: 32px;
      top: 50%;
      transform: translateY(-50%);
    }
  }

  // 内容
  .content_box {
    min-height: 380px;

    // 文案
    .text {
      margin-top: 54px;
      text-align: center;
      font-size: 28px;
    }

    // input输入框
    .input_box {
      margin: 46px auto 0;
      width: 600px;
      line-height: 100px;
      position: relative;
      .input {
        display: flex;
        width: 100%;
        .input_item {
          height: 100px;
          flex: 1;
          border: 1px solid rgba(221, 221, 221, 1); /*no*/
          border-right: 0;
          text-align: center;
          position: relative;
          font-size: 40px;
          &:last-child {
            border-right: 1px solid rgba(221, 221, 221, 1); /*no*/
          }
          .circle {
            width: 20px;
            height: 20px;
            border-radius: 100%;
            background: black;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
          }
        }
      }
      .hidden_input {
        position: absolute;
        opacity: 0;
        height: 100%;
        left: 0;
        top: 0;

        //兼容ios隐藏光标
        margin-left: -100%;
        text-indent: -999em;
        width: 200%;
      }
    }

    // 提示文案
    .tip {
      width: 600px;
      margin: 0 auto;
      font-size: 24px;
      height: 72px;
      line-height: 72px;
      .error {
        color: #fc4d4d;
      }
      .send {
        float: right;
      }
    }
  }
}
</style>