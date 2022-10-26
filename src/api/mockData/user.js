// 由于需要修改数据,就在本地模拟请求
// 这里的代码就充当一个后端的角色,生成一些数据供请求
import Mock from "mockjs";
import { nanoid } from "nanoid";

// get请求从config.url获取参数,postcongconfig.body获取参数
// 这个url哪来的呢???,读取不到,获取的数据也就undefined
function param2Obj(url) {
  const search = url.split("?")[1];
  if (!search) {
    return {};
  }
  return JSON.parse(
    '{"' +
      decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"') +
      '"}'
  );
}

export default {
  // // 获取列表
  // // 要带参数 name page limt name可以不填 page limit有默认值
  // // @param name,page,limit
  // // @return{{code: number,count: number,data :*[]}}
  // getUserList: (config) => {
  //   const { name, page = 1, limit = 20 } = param2Obj(config.url);
  //   const mockList = List.filter((user) => {
  //     if (
  //       name &&
  //       user.name.indexOf(name) === -1 &&
  //       user.addr.indexOf(name) === -1
  //     )
  //       return false;
  //     return true;
  //   });
  //   const pageList = mockList.filter(
  //     (item, index) => index < limit * page && index >= limit * (page - 1)
  //   );
  //   return {
  //     code: 200,
  //     list: pageList,
  //     count: mockList.length,
  //   };
  // },
  // // 批量删除
  // batchremove: (config) => {
  //   let { ids } = param20bj(config.url);
  //   ids = ids.split(",");
  //   List = List.filter((u) => !ids.includes(u.id));
  //   return {
  //     code: 20000,
  //     data: {
  //       message: "批量删除成功",
  //     },
  //   };
  // },
  // // 修改用户啊
  // updataUser: (config) => {
  //   const { id, name, addr, age, birth, sex } = JSON.parse(config.body);
  //   const sex_num = parseInt(sex);
  //   // 只要有满足条件就返回true
  //   List.some((u) => {
  //     if (u.id === id) {
  //       u.name = name;
  //       u.sex = sex_num;
  //       u.birth = birth;
  //       u.age = age;
  //       u.addr = addr;
  //       return true;
  //     }
  //   });
  //   return {
  //     code: 20000,
  //     data: {
  //       message: "编辑成功",
  //     },
  //   };
  // },

  // 无法获取数据只能写死了
  getUserList: () => {
    var time = new Date().toLocaleDateString().replaceAll('/','-');
    return {
      code: 200,
      data: {
        data: [
          {
            id: nanoid(),
            name: "张三",
            age: 18,
            sex: Math.round(Math.random()),
            birth: time,
            addr: "江西省 赣州市 晋安区",
          },
          {
            id: nanoid(),
            name: "张三",
            age: 18,
            sex: Math.round(Math.random()),
            birth: time,
            addr: "江西省 赣州市 晋安区",
          },
          {
            id: nanoid(),
            name: "张三",
            age: 18,
            sex: Math.round(Math.random()),
            birth: time,
            addr: "江西省 赣州市 晋安区",
          },
          {
            id: nanoid(),
            name: "张三",
            age: 18,
            sex: Math.round(Math.random()),
            birth: time,
            addr: "江西省 赣州市 晋安区",
          },
          {
            id: nanoid(),
            name: "张三",
            age: 18,
            sex: Math.round(Math.random()),
            birth: time,
            addr: "江西省 赣州市 晋安区",
          },
          {
            id: nanoid(),
            name: "张三",
            age: 18,
            sex: Math.round(Math.random()),
            birth: time,
            addr: "江西省 赣州市 晋安区",
          },
          {
            id: nanoid(),
            name: "张三",
            age: 18,
            sex: Math.round(Math.random()),
            birth: time,
            addr: "江西省 赣州市 晋安区",
          },
          {
            id: nanoid(),
            name: "张三",
            age: 18,
            sex: Math.round(Math.random()),
            birth: time,
            addr: "江西省 赣州市 晋安区",
          },
          {
            id: nanoid(),
            name: "张三",
            age: 18,
            sex: Math.round(Math.random()),
            birth: time,
            addr: "江西省 赣州市 晋安区",
          },
          {
            id: nanoid(),
            name: "张三",
            age: 18,
            sex: Math.round(Math.random()),
            birth: time,
            addr: "江西省 赣州市 晋安区",
          },
          {
            id: nanoid(),
            name: "张三",
            age: 18,
            sex: Math.round(Math.random()),
            birth: time,
            addr: "江西省 赣州市 晋安区",
          },
          {
            id: nanoid(),
            name: "张三",
            age: 18,
            sex: Math.round(Math.random()),
            birth: time,
            addr: "江西省 赣州市 晋安区",
          },
          {
            id: nanoid(),
            name: "张三",
            age: 18,
            sex: Math.round(Math.random()),
            birth: time,
            addr: "江西省 赣州市 晋安区",
          },
          {
            id: nanoid(),
            name: "张三",
            age: 18,
            sex: Math.round(Math.random()),
            birth: time,
            addr: "江西省 赣州市 晋安区",
          },
          {
            id: nanoid(),
            name: "张三",
            age: 18,
            sex: Math.round(Math.random()),
            birth: time,
            addr: "江西省 赣州市 晋安区",
          },
          {
            id: nanoid(),
            name: "张三",
            age: 18,
            sex: Math.round(Math.random()),
            birth: time,
            addr: "江西省 赣州市 晋安区",
          },
          {
            id: nanoid(),
            name: "张三",
            age: 18,
            sex: Math.round(Math.random()),
            birth: time,
            addr: "江西省 赣州市 晋安区",
          },
          {
            id: nanoid(),
            name: "张三",
            age: 18,
            sex: Math.round(Math.random()),
            birth: time,
            addr: "江西省 赣州市 晋安区",
          },
          {
            id: nanoid(),
            name: "张三",
            age: 18,
            sex: Math.round(Math.random()),
            birth: time,
            addr: "江西省 赣州市 晋安区",
          },
          {
            id: nanoid(),
            name: "张三",
            age: 18,
            sex: Math.round(Math.random()),
            birth: time,
            addr: "江西省 赣州市 晋安区",
          },
          {
            id: nanoid(),
            name: "张三",
            age: 18,
            sex: Math.round(Math.random()),
            birth: time,
            addr: "江西省 赣州市 晋安区",
          },
          {
            id: nanoid(),
            name: "张三",
            age: 18,
            sex: Math.round(Math.random()),
            birth: time,
            addr: "江西省 赣州市 晋安区",
          },
          {
            id: nanoid(),
            name: "张三",
            age: 18,
            sex: Math.round(Math.random()),
            birth: time,
            addr: "江西省 赣州市 晋安区",
          },
          {
            id: nanoid(),
            name: "张三",
            age: 18,
            sex: Math.round(Math.random()),
            birth: time,
            addr: "江西省 赣州市 晋安区",
          },
          {
            id: nanoid(),
            name: "张三",
            age: 18,
            sex: Math.round(Math.random()),
            birth: time,
            addr: "江西省 赣州市 晋安区",
          },
          {
            id: nanoid(),
            name: "张三",
            age: 18,
            sex: Math.round(Math.random()),
            birth: time,
            addr: "江西省 赣州市 晋安区",
          },
          {
            id: nanoid(),
            name: "张三",
            age: 18,
            sex: Math.round(Math.random()),
            birth: time,
            addr: "江西省 赣州市 晋安区",
          },
          {
            id: nanoid(),
            name: "张三",
            age: 18,
            sex: Math.round(Math.random()),
            birth: time,
            addr: "江西省 赣州市 晋安区",
          },
          {
            id: nanoid(),
            name: "张三",
            age: 18,
            sex: Math.round(Math.random()),
            birth: time,
            addr: "江西省 赣州市 晋安区",
          },
          {
            id: nanoid(),
            name: "张三",
            age: 18,
            sex: Math.round(Math.random()),
            birth: time,
            addr: "江西省 赣州市 晋安区",
          },
          {
            id: nanoid(),
            name: "张三",
            age: 18,
            sex: Math.round(Math.random()),
            birth: time,
            addr: "江西省 赣州市 晋安区",
          },
          {
            id: nanoid(),
            name: "张三",
            age: 18,
            sex: Math.round(Math.random()),
            birth: time,
            addr: "江西省 赣州市 晋安区",
          },
          {
            id: nanoid(),
            name: "张三",
            age: 18,
            sex: Math.round(Math.random()),
            birth: time,
            addr: "江西省 赣州市 晋安区",
          },
          {
            id: nanoid(),
            name: "张三",
            age: 18,
            sex: Math.round(Math.random()),
            birth: time,
            addr: "江西省 赣州市 晋安区",
          },
          {
            id: nanoid(),
            name: "张三",
            age: 18,
            sex: Math.round(Math.random()),
            birth: time,
            addr: "江西省 赣州市 晋安区",
          },
          {
            id: nanoid(),
            name: "张三",
            age: 18,
            sex: Math.round(Math.random()),
            birth: time,
            addr: "江西省 赣州市 晋安区",
          },
          {
            id: nanoid(),
            name: "张三",
            age: 18,
            sex: Math.round(Math.random()),
            birth: time,
            addr: "江西省 赣州市 晋安区",
          },
          {
            id: nanoid(),
            name: "张三",
            age: 18,
            sex: Math.round(Math.random()),
            birth: time,
            addr: "江西省 赣州市 晋安区",
          },
          {
            id: nanoid(),
            name: "张三",
            age: 18,
            sex: Math.round(Math.random()),
            birth: time,
            addr: "江西省 赣州市 晋安区",
          },
          {
            id: nanoid(),
            name: "张三",
            age: 18,
            sex: Math.round(Math.random()),
            birth: time,
            addr: "江西省 赣州市 晋安区",
          },
          {
            id: nanoid(),
            name: "张三",
            age: 18,
            sex: Math.round(Math.random()),
            birth: time,
            addr: "江西省 赣州市 晋安区",
          },
          {
            id: nanoid(),
            name: "张三",
            age: 18,
            sex: Math.round(Math.random()),
            birth: time,
            addr: "江西省 赣州市 晋安区",
          },
          {
            id: nanoid(),
            name: "张三",
            age: 18,
            sex: Math.round(Math.random()),
            birth: time,
            addr: "江西省 赣州市 晋安区",
          },
          {
            id: nanoid(),
            name: "张三",
            age: 18,
            sex: Math.round(Math.random()),
            birth: time,
            addr: "江西省 赣州市 晋安区",
          },
          {
            id: nanoid(),
            name: "张三",
            age: 18,
            sex: Math.round(Math.random()),
            birth: time,
            addr: "江西省 赣州市 晋安区",
          },
          {
            id: nanoid(),
            name: "张三",
            age: 18,
            sex: Math.round(Math.random()),
            birth: time,
            addr: "江西省 赣州市 晋安区",
          },
          {
            id: nanoid(),
            name: "张三",
            age: 18,
            sex: Math.round(Math.random()),
            birth: time,
            addr: "江西省 赣州市 晋安区",
          },
          {
            id: nanoid(),
            name: "张三",
            age: 18,
            sex: Math.round(Math.random()),
            birth: time,
            addr: "江西省 赣州市 晋安区",
          },
          {
            id: nanoid(),
            name: "张三",
            age: 18,
            sex: Math.round(Math.random()),
            birth: time,
            addr: "江西省 赣州市 晋安区",
          },
          {
            id: nanoid(),
            name: "张三",
            age: 18,
            sex: Math.round(Math.random()),
            birth: time,
            addr: "江西省 赣州市 晋安区",
          },
          {
            id: nanoid(),
            name: "张三",
            age: 18,
            sex: Math.round(Math.random()),
            birth: time,
            addr: "江西省 赣州市 晋安区",
          },
          {
            id: nanoid(),
            name: "张三",
            age: 18,
            sex: Math.round(Math.random()),
            birth: time,
            addr: "江西省 赣州市 晋安区",
          },
          {
            id: nanoid(),
            name: "张三",
            age: 18,
            sex: Math.round(Math.random()),
            birth: time,
            addr: "江西省 赣州市 晋安区",
          },
          {
            id: nanoid(),
            name: "张三",
            age: 18,
            sex: Math.round(Math.random()),
            birth: time,
            addr: "江西省 赣州市 晋安区",
          },
          {
            id: nanoid(),
            name: "张三",
            age: 18,
            sex: Math.round(Math.random()),
            birth: time,
            addr: "江西省 赣州市 晋安区",
          },
          {
            id: nanoid(),
            name: "张三",
            age: 18,
            sex: Math.round(Math.random()),
            birth: time,
            addr: "江西省 赣州市 晋安区",
          },
          {
            id: nanoid(),
            name: "张三",
            age: 18,
            sex: Math.round(Math.random()),
            birth: time,
            addr: "江西省 赣州市 晋安区",
          },
          {
            id: nanoid(),
            name: "张三",
            age: 18,
            sex: Math.round(Math.random()),
            birth: time,
            addr: "江西省 赣州市 晋安区",
          },
          {
            id: nanoid(),
            name: "张三",
            age: 18,
            sex: Math.round(Math.random()),
            birth: time,
            addr: "江西省 赣州市 晋安区",
          },
          {
            id: nanoid(),
            name: "张三",
            age: 18,
            sex: Math.round(Math.random()),
            birth: time,
            addr: "江西省 赣州市 晋安区",
          },
          {
            id: nanoid(),
            name: "张三",
            age: 18,
            sex: Math.round(Math.random()),
            birth: time,
            addr: "江西省 赣州市 晋安区",
          },
          {
            id: nanoid(),
            name: "张三",
            age: 18,
            sex: Math.round(Math.random()),
            birth: time,
            addr: "江西省 赣州市 晋安区",
          },
          {
            id: nanoid(),
            name: "张三",
            age: 18,
            sex: Math.round(Math.random()),
            birth: time,
            addr: "江西省 赣州市 晋安区",
          },
          {
            id: nanoid(),
            name: "张三",
            age: 18,
            sex: Math.round(Math.random()),
            birth: time,
            addr: "江西省 赣州市 晋安区",
          },
          {
            id: nanoid(),
            name: "张三",
            age: 18,
            sex: Math.round(Math.random()),
            birth: time,
            addr: "江西省 赣州市 晋安区",
          },
          {
            id: nanoid(),
            name: "张三",
            age: 18,
            sex: Math.round(Math.random()),
            birth: time,
            addr: "江西省 赣州市 晋安区",
          },
          {
            id: nanoid(),
            name: "张三",
            age: 18,
            sex: Math.round(Math.random()),
            birth: time,
            addr: "江西省 赣州市 晋安区",
          },
          {
            id: nanoid(),
            name: "张三",
            age: 18,
            sex: Math.round(Math.random()),
            birth: time,
            addr: "江西省 赣州市 晋安区",
          },
          {
            id: nanoid(),
            name: "张三",
            age: 18,
            sex: Math.round(Math.random()),
            birth: time,
            addr: "江西省 赣州市 晋安区",
          },
          {
            id: nanoid(),
            name: "张三",
            age: 18,
            sex: Math.round(Math.random()),
            birth: time,
            addr: "江西省 赣州市 晋安区",
          },
          {
            id: nanoid(),
            name: "张三",
            age: 18,
            sex: Math.round(Math.random()),
            birth: time,
            addr: "江西省 赣州市 晋安区",
          },
          {
            id: nanoid(),
            name: "张三",
            age: 18,
            sex: Math.round(Math.random()),
            birth: time,
            addr: "江西省 赣州市 晋安区",
          },
          {
            id: nanoid(),
            name: "张三",
            age: 18,
            sex: Math.round(Math.random()),
            birth: time,
            addr: "江西省 赣州市 晋安区",
          },
          {
            id: nanoid(),
            name: "张三",
            age: 18,
            sex: Math.round(Math.random()),
            birth: time,
            addr: "江西省 赣州市 晋安区",
          },
          {
            id: nanoid(),
            name: "张三",
            age: 18,
            sex: Math.round(Math.random()),
            birth: time,
            addr: "江西省 赣州市 晋安区",
          },
          {
            id: nanoid(),
            name: "张三",
            age: 18,
            sex: Math.round(Math.random()),
            birth: time,
            addr: "江西省 赣州市 晋安区",
          },
          {
            id: nanoid(),
            name: "张三",
            age: 18,
            sex: Math.round(Math.random()),
            birth: time,
            addr: "江西省 赣州市 晋安区",
          },
          {
            id: nanoid(),
            name: "张三",
            age: 18,
            sex: Math.round(Math.random()),
            birth: time,
            addr: "江西省 赣州市 晋安区",
          },
          {
            id: nanoid(),
            name: "张三",
            age: 18,
            sex: Math.round(Math.random()),
            birth: time,
            addr: "江西省 赣州市 晋安区",
          },
          {
            id: nanoid(),
            name: "张三",
            age: 18,
            sex: Math.round(Math.random()),
            birth: time,
            addr: "江西省 赣州市 晋安区",
          },
          {
            id: nanoid(),
            name: "张三",
            age: 18,
            sex: Math.round(Math.random()),
            birth: time,
            addr: "江西省 赣州市 晋安区",
          },
          {
            id: nanoid(),
            name: "张三",
            age: 18,
            sex: Math.round(Math.random()),
            birth: time,
            addr: "江西省 赣州市 晋安区",
          },
          {
            id: nanoid(),
            name: "张三",
            age: 18,
            sex: Math.round(Math.random()),
            birth: time,
            addr: "江西省 赣州市 晋安区",
          },
          {
            id: nanoid(),
            name: "张三",
            age: 18,
            sex: Math.round(Math.random()),
            birth: time,
            addr: "江西省 赣州市 晋安区",
          },
          {
            id: nanoid(),
            name: "张三",
            age: 18,
            sex: Math.round(Math.random()),
            birth: time,
            addr: "江西省 赣州市 晋安区",
          },
          {
            id: nanoid(),
            name: "张三",
            age: 18,
            sex: Math.round(Math.random()),
            birth: time,
            addr: "江西省 赣州市 晋安区",
          },
          {
            id: nanoid(),
            name: "张三",
            age: 18,
            sex: Math.round(Math.random()),
            birth: time,
            addr: "江西省 赣州市 晋安区",
          },
          {
            id: nanoid(),
            name: "张三",
            age: 18,
            sex: Math.round(Math.random()),
            birth: time,
            addr: "江西省 赣州市 晋安区",
          },
          {
            id: nanoid(),
            name: "张三",
            age: 18,
            sex: Math.round(Math.random()),
            birth: time,
            addr: "江西省 赣州市 晋安区",
          },
          {
            id: nanoid(),
            name: "张三",
            age: 18,
            sex: Math.round(Math.random()),
            birth: time,
            addr: "江西省 赣州市 晋安区",
          },
          {
            id: nanoid(),
            name: "张三",
            age: 18,
            sex: Math.round(Math.random()),
            birth: time,
            addr: "江西省 赣州市 晋安区",
          },
          {
            id: nanoid(),
            name: "张三",
            age: 18,
            sex: Math.round(Math.random()),
            birth: time,
            addr: "江西省 赣州市 晋安区",
          },
          {
            id: nanoid(),
            name: "张三",
            age: 18,
            sex: Math.round(Math.random()),
            birth: time,
            addr: "江西省 赣州市 晋安区",
          },
          {
            id: nanoid(),
            name: "张三",
            age: 18,
            sex: Math.round(Math.random()),
            birth: time,
            addr: "江西省 赣州市 晋安区",
          },
          {
            id: nanoid(),
            name: "张三",
            age: 18,
            sex: Math.round(Math.random()),
            birth: time,
            addr: "江西省 赣州市 晋安区",
          },
          {
            id: nanoid(),
            name: "张三",
            age: 18,
            sex: Math.round(Math.random()),
            birth: time,
            addr: "江西省 赣州市 晋安区",
          },
          {
            id: nanoid(),
            name: "张三",
            age: 18,
            sex: Math.round(Math.random()),
            birth: time,
            addr: "江西省 赣州市 晋安区",
          },
          {
            id: nanoid(),
            name: "张三",
            age: 18,
            sex: Math.round(Math.random()),
            birth: time,
            addr: "江西省 赣州市 晋安区",
          },
          {
            id: nanoid(),
            name: "张三",
            age: 18,
            sex: Math.round(Math.random()),
            birth: time,
            addr: "江西省 赣州市 晋安区",
          },
          {
            id: nanoid(),
            name: "张三",
            age: 18,
            sex: Math.round(Math.random()),
            birth: time,
            addr: "江西省 赣州市 晋安区",
          },
        ],
      },
    };
  },
};
