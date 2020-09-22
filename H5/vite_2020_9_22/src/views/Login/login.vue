<template>
  <div>我是登录页</div>
  <router-link to="/register">去注册</router-link>
  <div>账号：<input type="text" v-model="formData.account" /></div>
  <div>密码：<input type="text" v-model="formData.pwd" /></div>
  <button @click="loginFunc">登录</button>
</template>

<script>
import { reactive, inject, getCurrentInstance } from "vue";

export default {
  name: "Login",
  setup(props) {
    const { ctx } = getCurrentInstance();

    console.log("props:", props);
    console.log("ctx:", ctx);
    console.log("ctx.$router:", ctx.$router);

    const formData = reactive({});
    const $user_info = inject("$user_info");

    let allUserList = localStorage.getItem("allUserList");
    allUserList = allUserList ? JSON.parse(allUserList) : [];

    // 登录
    const loginFunc = () => {
      console.log(formData);
      let findObj = allUserList.find((item) => {
        return formData.account == item.account && formData.pwd == item.pwd;
      });
      if (!findObj) {
        alert("用户不存在或密码错误");
        return;
      }

      Object.assign($user_info, findObj);
      alert("登录成功");
      ctx.$router.push("/demo");
    };

    return {
      formData,
      loginFunc,
    };
  },
};
</script>
