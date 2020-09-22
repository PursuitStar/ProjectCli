<template>
  <div>我是注册页</div>
  <router-link to="/login">去登录</router-link>
  <div>账号：<input type="text" v-model="formData.account" /></div>
  <div>密码：<input type="password" v-model="formData.pwd" /></div>
  <div>昵称：<input type="text" v-model="formData.name" /></div>
  <div>年龄：<input type="number" v-model="formData.age" /></div>
  <button @click="registerFunc">提交</button>
</template>

<script>
import { reactive, inject, getCurrentInstance } from "vue";

export default {
  name: "Register",
  setup(props) {
    const { ctx } = getCurrentInstance();

    console.log("props:", props);
    console.log("ctx:", ctx);
    console.log("ctx.$router:", ctx.$router);

    const formData = reactive({});

    let allUserList = localStorage.getItem("allUserList");
    allUserList = allUserList ? JSON.parse(allUserList) : [];

    // 登录
    const registerFunc = () => {
      console.log(formData);
      let findObj = allUserList.find(
        (item) => formData.account == item.account
      );
      if (findObj) {
        alert("用户已存在");
        return;
      }

      allUserList.push(formData);
      localStorage.setItem("allUserList", JSON.stringify(allUserList));
      alert("注册成功");

      ctx.$router.push("/login");
    };

    return {
      formData,
      registerFunc,
    };
  },
};
</script>
