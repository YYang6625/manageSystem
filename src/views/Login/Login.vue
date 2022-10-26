<template>
  <!-- 绑定数据 -->
  <!-- 添加规则 -->
  <body>
    <!-- 当组件ref与双向绑定数据model中的变量名一致时 -->
    <!-- input框会出现输入异常问题 -->
    <el-form
      ref="form"
      :model="formUser"
      :rules="rules"
      class="login-container"
    >
      <h3>系统登陆</h3>
      <!-- 一般都是悠惠易购专门的数据来作为prop或者label进行直接引用 -->
      <!-- 而不是像下面直接写死，就比如userManage组件中的tableLabel -->
      <el-form-item label="用户名" prop="username">
        <el-input
          v-model="formUser.username"
          placeholder="账号名/邮箱/手机号"
        ></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input
          v-model="formUser.password"
          type="password"
          placeholder="请输入登录密码"
          style="margin-left: 12px"
          @keyup.enter="Login()"
        ></el-input>
      </el-form-item>
      <el-button @click="Login()" type="success" size="large">登录</el-button>
    </el-form>
  </body>
</template>
<script>
import { getCurrentInstance, reactive } from "vue";
import { ElMessage } from "element-plus";
import Cookie from "js-cookie";
import { useTransit } from "../../store/index.js";
// 注意默认导出export default不需要{}
export default {
  setup() {
    const transit = useTransit();
    const { proxy,appContext } = getCurrentInstance();
    const formUser = reactive({
      username: "",
      password: "",
    });
    const rules = {
      // 以下required表示表单为必填选项，未填写后显示下面的信息
      // trigger含义未触发，blur未获得焦点触发，还有不触发
      username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
      password: [{ required: true, message: "请输入密码", trigger: "blur" }],
    };
    const Login = () => {
      // 通过校验就发送请求(valid=true)
      proxy.$refs.form.validate(async (valid) => {
        if (valid) {
          // 接收返回的axios请求数据
          let res = await proxy.$api.getMenu(proxy.formUser);
          console.log(res);
          console.log(appContext);
          // 先将数据存入store，并存储在本地
          transit.setMenu(res.menu);
          // 在mock中已经写了当code=200返回数据,不是200会返回错误信息,利用message来做判断
          if (res.token) {
            // 并将返回数据中的token保存起来,并跳转页面
            Cookie.set("token", res.token);
            proxy.$router.push("/home");
            ElMessage({
              message: res.message,
              type: "success",
            });
          }
          // 在mock中已经做了请求错误的提示,这里就不再做了
        }
      });
      // 获取路由的三种方法
      // 1.在当前vue引入vue-router中的useroute/userRouter(当前组件路由，全局路由)
      // let $router = userRouter();
      // let $route = userRoute();
      // 2.通过const { proxy } = getCurrentInstance()获取当前实例(如上实例)
      // 在ts中需要断言 as 不然会报错 类型“ComponentInternalInstance | null”
      // let {proxy} = getCurrentInstance() as ComponentInternalInstance 即可
      // 3.在第二种方法上扩展(需要TS)，通过当前实例去获取全局的变量，还有一个app.config...，在APP.vue中去使用某个方法或者参数
      // const { appContext } = getCurrentInstance() as ComponentInternalInstance;
      // appContext.config.globalProperties.$router.push("/home");
    };
    return {
      rules,
      formUser,
      Login,
    };
  },
};
</script>
<style lang="less" scoped>
body {
  overflow: hidden;
}
h3 {
  margin-bottom: 30px;
}
.login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 350px;
  border: 1px solid #eaeaea;
  margin: 30vh auto;
  padding-top: 300px;
  background-color: #fff;
  border-radius: 25px;
  box-shadow: 0 0 25px #cac6c6;
  text-align: center;
  padding: 10px 30px;
  input {
    color: black;
  }
}
</style>
