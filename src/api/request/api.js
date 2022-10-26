// 整个项目api的管理
// 将api挂载至全局(通过全局调用某个请求)

import request from "./index.js";
export default {
  // home组件 左侧数据
  getTableData(params) {
    return request({
      url: "/home/getTableData",
      method: "get",
      data: params,
      // 单个接口mock的控制
      mock: true,
    });
  },
  // 获取count数据
  getCountData(params) {
    return request({
      url: "/home/getCountData",
      method: "get",
      // 单个接口mock的控制
      mock: true,
    });
  },
  // 获取echart表格数据
  getEchartData(params) {
    return request({
      url: "/home/getEchartData",
      method: "get",
      // 单个接口mock的控制
      mock: true,
    });
  },
  // 获取userData数据
  getUserData(params) {
    return request({
      // 这里需要和拦截请求的地址一致,拦截之后返回自定义的一些数据
      url: "/user/getUser",
      method: "get",
      // 这里不需要先上就关闭mock
      mock: false,
      data: params,
    });
  },
  // 根据用户名返回对应列表
  getMenu(params) {
    return request({
      // 这里需要和拦截请求的地址一致,拦截之后返回自定义的一些数据
      url: "/permission/getMenu",
      method: "post",
      // 这里不需要先上就关闭mock
      mock: false,
      data: params,
    });
  },
};
