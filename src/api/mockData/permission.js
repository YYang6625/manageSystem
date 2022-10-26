import Mock from "mockjs";
import { nanoid } from "nanoid";
// 拦截用户登录
export default {
  getMenu: (config) => {
    //打印参看config内部值都是字字符串形式需要转换
    // console.log(config);
    const { username, password } = JSON.parse(config.body);
    if (username === "admin" && password === "admin") {
      return {
        code: 200,
        data: {
          menu: [
            {
              path: "/",
              name: "home",
              label: "首页",
              icon: "House",
              url: "Home/Home",
            },
            {
              path: "/mall",
              name: "mall",
              label: "商品管理",
              icon: "Management",
              url: "MallManage/MallManage",
            },
            {
              path: "/user",
              name: "user",
              label: "用户管理",
              icon: "user",
              url: "UserManage/UserManage",
            },
            {
              label: "其他",
              icon: "location",
              children: [
                {
                  path: "/page1",
                  name: "page1",
                  label: "页面一",
                  icon: "setting",
                  url: "Other/PageOne",
                },
                {
                  path: "/page2",
                  name: "page2",
                  label: "页面二",
                  icon: "setting",
                  url: "Other/PageTwo",
                },
              ],
            },
          ],
          token: nanoid(),
          message: "成功登录",
        },
      };
    } else if (username === "xiaoxiao" && password === "xiaoxiao") {
      return {
        code: 200,
        data: {
          menu: [
            {
              path: "/",
              name: "home",
              label: "首页",
              icon: "House",
              url: "Home/Home",
            },
            {
              path: "/mall",
              name: "mall",
              label: "商品管理",
              icon: "Management",
              url: "MallManage/MallManage",
            },
            // {
            //   path: "/user",
            //   name: "user",
            //   label: "用户管理",
            //   icon: "user",
            //   url: "UserManage/UserManage",
            // },
            {
              label: "其他",
              icon: "location",
              children: [
                {
                  path: "/page1",
                  name: "page1",
                  label: "页面一",
                  icon: "setting",
                  url: "Other/PageOne",
                },
                {
                  path: "/page2",
                  name: "page2",
                  label: "页面二",
                  icon: "setting",
                  url: "Other/PageTwo",
                },
              ],
            },
          ],
          token: nanoid(),
          message: "成功登录",
        },
      };
    } else {
      return {
        code: -999,
        data: {
          msg: "用户名不存在/密码错误",
        },
      };
    }
  },
};
