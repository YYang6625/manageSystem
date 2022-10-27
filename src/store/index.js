// 在main.js引入之后创建仓库即可
import { nanoid } from "nanoid";
import { defineStore } from "pinia";
import Cookie from "js-cookie";

// 暴露仓库
export const useTransit = defineStore("transit", {
  state: () => {
    return {
      collapse: false,
      currentMenu: null,
      totalHeight: 640,
      height: 50,
      tabList: [
        {
          path: "/",
          name: "home",
          label: "首页",
          icon: "home",
        },
      ],
      userList: [] || JSON.parse(localStorage.getItem("userList")),
      // 用户menu
      Menu: [] || JSON.parse(localStorage.getItem("menu")),
    };
  },
  actions: {
    // 改变状态函数
    updataCollapse() {
      this.collapse = !this.collapse;
    },
    // 组件之间的跳转(接收传递过来的路由信息)
    selectMenu(value) {
      // 接收路由信息并进行判断
      if (value.name == "home") {
        this.currentMenu = null;
      } else {
        // 如果不是则添加进一个数组内后用与渲染值页面
        this.currentMenu = value;
        let result = this.tabList.findIndex((item) => item.name === value.name);
        // 不存在就添加至tablist数周内
        result == -1 ? this.tabList.push(value) : "";
      }
    },
    // 关闭面包屑中的小tag
    closeTag(value) {
      // findInde会返回第一个符合数据的索引
      let index = this.tabList.findIndex((item) => item.name === value.name);
      // 找到之后我们进行删除即可(或者利用筛选filter函数将剩余的筛选出来放到新数组中)
      this.tabList.splice(index, 1);
    },
    // 接收用户数据,用于后续操作
    fetchUserData(users) {
      console.log("fetchUserData");
      // 查看数据
      // console.log(users);
      // 将数据存储在浏览器
      this.userList = users;
      localStorage.setItem("userList", JSON.stringify(users));
      localStorage.setItem("userList", JSON.stringify(users));
    },
    // 添加用户信息(深拷贝防止之前提交的数据被修改)
    adduser(data) {
      console.log("adduser");
      data.id = nanoid();
      data.name = data.name.trim();
      // console.log(data);
      this.userList.unshift(data);
      // 深拷贝
      // 之前提交数据之后，之前的数据会和后面提交的数据变成一样，这是因为vue无法监听对象中某个数据的添加，双向绑定的同一个数据
      // 由于提交监听的是同一个数据，就会修改之前所提交的，利用深拷贝将引用的地址变化，也就是生成一个全新的对象去监听
      // 这样由于监听的对象本身也发生了变化，提交的数据也就只是单独某次提交的数据，也就不会修改之前的数据了
      this.userList = JSON.parse(JSON.stringify(this.userList));
    },
    // 删除用户数据
    removeUserData(id) {
      console.log("removeUserData");
      // 1.利用forEach/map遍历后splice删除数据
      // this.userList.forEach((item, index, arr) => {
      //   if (item.id === id) {
      //     arr.splice(index, 1);
      //     console.log(arr);
      //   }
      // });
      // 2.利用filter删除数据
      this.userList = this.userList.filter((item) => {
        return item.id !== id;
      });
      // 在效率方面，for>filter>foreach>map>for in (for in 是要遍历原型链，所以效率更低)
    },
    // 编辑用户
    EditUser(userData) {
      console.log("EditUser");
      // 1.替换数据
      this.userList.forEach((item, index, arr) => {
        if (item.id === userData.id) {
          // forEach不会改变数组，需要利用参数手动将数组进行改变
          arr[index] = userData;
          console.log(arr);
        }
        localStorage.setItem("userList", JSON.stringify(arr));
      });
      // 2.也利用map生成一个新数组(由于vue的监听属性，会对每一刚刚属性进行监听进行包装，效率低)
      // 需要返回数据
      // this.userList = this.userList.map((item) => {
      //   if (item.id === userData.id) {
      //     item = userData;
      //     return item;
      //   } else {
      //     return item;
      //   }
      // });
    },
    // 搜索用户
    selectUser(user) {
      console.log("selectUser");
      user = user.trim();
      this.userList = this.userList.filter((item) => item.name === user);
    },
    // 存储用户的menu
    setMenu(value) {
      console.log("setMenu");
      this.Menu = value;
      localStorage.setItem("menu", JSON.stringify(value));
    },
  },
});
