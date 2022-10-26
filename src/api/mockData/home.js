// mockjs作用:
// 1.mockjs是用于拦截ajax请求，模拟服务器返回数据 mockjs的实现原理是对XHR对象的拦截，属于js拦截，所以浏览器并没有发出请求
// 2.添加相关接口地址，

// 3.拦截发送请求以及请求信息，

// 4.按照模板生成随机数据，

// 5.返回请求源生成信息

// 一：本地mock的使用
export default {
  getHomeData: () => {
    return {
      code: 200,
      data: {
        tableData: [
          {
            name: "oppo",
            todayBuy: 500,
            mothBuy: 3500,
            totalBuy: 22000,
          },
          {
            name: "vivo",
            todayBuy: 500,
            mothBuy: 3500,
            totalBuy: 22000,
          },
          {
            name: "苹果",
            todayBuy: 500,
            mothBuy: 3500,
            totalBuy: 22000,
          },
          {
            name: "小米",
            todayBuy: 1200,
            mothBuy: 6500,
            totalBuy: 45000,
          },
          {
            name: "三星",
            todayBuy: 500,
            mothBuy: 2000,
            totalBuy: 34000,
          },
          {
            name: "魅族",
            todayBuy: 350,
            mothBuy: 3500,
            totalBuy: 22000,
          },
        ],
      },
    };
  },
};
// 二.在线mock官网进行请求
//await axios.get(
//   "https://www.fastmock.site/mock/9f511f427bc80b2ea1b1ae5388de1da9/api/home/getTableData"
// )
// .then((res) => {
//   console.log(res);
//   if (res.data.code == 200) {
//     tableData.value = res.data.data;
//   }
