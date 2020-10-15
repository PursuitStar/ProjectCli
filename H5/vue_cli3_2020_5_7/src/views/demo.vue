<template>
  <div class="page">
    <div class="content" v-scroll>
      <!-- 模态框组件示例 -->
      <div>
        <button @click.stop="showModal">显示modal</button>
        <Modal
          :visiable="modalVisiable"
          direction="center"
          @closeModal="closeModal"
        >
          <template v-slot:default="slotProps">
            <div class="self_modal">
              <button @click.stop="slotProps.close">关闭模态框</button>
              <div>模态框内容</div>
            </div>
          </template>
        </Modal>
      </div>

      <!-- 签名组件示例 -->
      <div>
        <button @click.stop="getSign">获取签名内容</button>
        <div class="my_canvas">
          <Sign ref="my_sign1" pointsName="points1" />
        </div>
      </div>

      <!-- 验证码输入框示例 -->
      <div>
        <button @click.stop="codeView = !codeView">验证码输入框显隐切换</button>
        <Code
          v-if="codeView"
          @closeModal="closeCodeView"
          @sendCode="sendCode"
          @checkCode="checkCode"
          phone="18257578432"
          :isSecret="true"
          :tipText="tipText"
        />
      </div>

      <!-- 工具函数示例-复制到粘贴板 -->
      <div>
        <button @click="copyToClipboard(text)">复制下方内容到粘贴板</button>
        <div>
          <input type="text" v-model="text" />
        </div>
      </div>

      <!-- 接口示例 -->
      <div>
        <div>上传文件：</div>
        <input type="file" name="" id="fileInput" @change="changeFile" />
        <button @click.stop="uploadFile">点击上传</button>
      </div>

      <div>
        <div>下载文件：</div>
        <button @click.stop="downloadExcel">点击下载excel</button>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src

import Modal from "@/components/Modal";
import Sign from "@/components/Sign";
import Code from "@/components/Code";

import {
  copyToClipboard,
  blobToFile,
  resizeImage,
  isImage,
} from "@/utils/tool";

export default {
  name: "Demo",
  components: {
    Modal,
    Sign,
    Code,
  },
  data() {
    return {
      modalVisiable: false, //模态框显隐控制

      points1: [], //签名

      codeView: false, //code视图显隐
      tipText: "", //code提示文案

      text: "", //粘贴板复制的内容

      file: undefined, //当前上传的文件
    };
  },
  mounted() {},
  methods: {
    //工具函数-复制到粘贴板
    copyToClipboard,

    /* --- 模态框相关 --- */
    // 模态框-显示
    showModal() {
      this.modalVisiable = true;
    },
    // 模态框-关闭
    closeModal() {
      this.modalVisiable = false;
    },

    /* --- 模态框相关 --- */
    // 签名-获取
    getSign() {
      let signData1 = this.$refs["my_sign1"].submitSign();
      if (signData1) {
        console.log(signData1);
      }
    },

    /* --- 验证码输入框相关 --- */
    // 关闭验证码输入框
    closeCodeView() {
      this.codeView = false;
      this.tipText = "";
    },
    // 发送验证码
    sendCode() {},
    // 校检验证码
    checkCode(password) {
      if (password == "123456") {
        this.tipText = "验证码错误请重试";
      } else {
        alert("校验通过");
        this.closeCodeView();
      }
    },

    /* --- 接口示例 --- */
    // 下载excel
    downloadExcel() {
      let params = {};
      this.$Api.CommonApi.download(params).then((res) => {
        blobToFile(res, "测试文件.xlsx");
      });
    },

    // 上传文件 - 动作
    changeFile(event) {
      let file = event.target.files[0];
      console.log(file);

      if (!isImage(file)) {
        alert("文件类型不对");
        this.file = undefined;
        document.querySelector("#fileInput").value = "";
        return false;
      }

      // 压缩图片
      resizeImage(file).then((res) => {
        console.log("resizeFile:", res);
        this.file = res;
      });
    },

    // 上传文件 - 接口
    uploadFile() {
      if (!this.file) {
        alert("请选择要上传的文件");
        return false;
      }
      let data = new FormData();
      data.append("file", this.file);
      data.append("fileType", "single_img");

      this.$Api.CommonApi.upload(data).then((res) => {
        console.log(res);

        // 上传完毕后 清空input文件列表
        document.querySelector("#fileInput").value = "";
      });
    },
  },
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

    // 模态框样式
    .self_modal {
      z-index: 100; //Modal center 需添加该字段
      width: 500px;
      height: 600px;
      background: #ffffff;
      color: #000000;
    }

    // 签名组件样式
    .my_canvas {
      width: 100%;
      height: 568px;
    }
  }
}
</style>
