<template>
  <el-main>
    <!-- el-row表示排 -->
    <el-row class="home" :gutter="20">
      <!-- el-col表示行 span默认为24 根据span来控制一行中el-col的占比 -->
      <el-col :span="8">
        <!-- 用户卡片部分(略过显示阴影) -->
        <el-card shadow="hover">
          <div class="user">
            <img src="../../assets/QQ图片20221002165355.jpg" alt="" />
            <div class="userInfo">
              <!-- 用户姓名 -->
              <p class="name">Admin</p>
              <p class="role">管理员</p>
            </div>
          </div>
          <div class="login-info">
            <p>上次登录时间 <span>2022-10-04</span></p>
            <p>上次登录地点 <span>天堂</span></p>
          </div>
        </el-card>
        <!-- 用户卡片下面部分 -->
        <el-card shadow="hover" style="margin-top: 1.5rem">
          <el-table :data="tableData">
            <!-- 遍历对象参数是value key(键) index-->
            <!-- 遍历数组参数是value index -->
            <el-table-column
              v-for="(val, key) in tableLabel"
              :key="key"
              :prop="key"
              :label="val"
            >
              <!-- 这里利用elementUI中的table表格props属性 -->
              <!-- 会直接将绑定的数据一一对应展示出来(element官网有说明) -->
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
      <!-- 右边count数据以及echarts数据表格 -->
      <el-col :span="16" style="margin-top: px">
        <div class="countDetail">
          <el-card
            :body-style="{ display: 'flex', padding: 0 }"
            v-for="item in countData"
            :key="item.name"
          >
            <component
              class="icons"
              :is="item.icon"
              :style="{ background: item.color }"
            ></component>
            <div class="details">
              <p class="price">￥{{ item.value }}</p>
              <p class="txt">{{ item.name }}</p>
            </div>
          </el-card>
        </div>
        <!-- echarts折线图 -->
        <el-card style="height: 5.6rem">
          <div ref="echart" style="height: 5.6rem"></div>
        </el-card>
        <!-- 柱状图以及饼图 -->
        <div class="graph">
          <el-card style="height: 5.2rem">
            <div ref="userEchart" style="height: 4.8rem"></div>
          </el-card>
          <el-card style="height: 5.2rem">
            <div ref="videoEchart" style="height: 4.8rem"></div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </el-main>
</template>

<script>
import {
  defineComponent,
  getCurrentInstance,
  onBeforeMount,
  ref,
  reactive,
} from "vue";
import * as echarts from "echarts";
//  defineComponent ，就是把接收的 Object 直接返回。 但是，就类型而言，返回的值有一个合成类型的构造函数，用于手动渲染函数
export default defineComponent({
  setup() {
    // 将api设置为全局之后
    // 利用vue3获取一个代理来后获取this指向(我们知道在vue2中this是指向实例vue的,setup(){}里面也是,vue3中script添加setup就对this进行了优化)
    const { proxy } = getCurrentInstance();
    let tableData = ref([]);
    let countData = ref([]);
    const tableLabel = {
      name: "课程",
      todayBuy: "今日购买",
      mothBuy: "本月购买",
      totalBuy: "总购买",
    };
    const getTableList = async () => {
      // 1.本地mock请求
      // await axios.get("/home/getData").then((res) => {
      //   console.log(res);
      //   if (res.data.code == 200) {
      //     tableData.value = res.data.data.tableData;
      //   }

      // 2.在线mock官网请求
      // await axios
      //   .get(
      //     "https://www.fastmock.site/mock/9f511f427bc80b2ea1b1ae5388de1da9/api/home/getTableData"
      //   )
      //   .then((res) => {
      //     console.log(res);
      //     if (res.data.code == 200) {
      //       tableData.value = res.data.data;
      //     }
      //     //异步请求在页面渲染之后，使用当数据请求完成，页面并不会展示最新数据
      //     //可以将异步请求提前，或者进行数据的双向绑定，这样会触发生命周期函数进行重新渲染
      //     // vue对引用类型内的属性进行修改时不是响应式，因为vue无法检测
      //     // ref等方法利用返回新的对象来触发响应式渲染，并监听劫持这个新的对象
      //   });

      // 使用全局定义的请求从fastmock官网获取数据
      let res = await proxy.$api.getTableData();
      tableData.value = res;
    };
    // 获取首页count数据
    const getCountData = async () => {
      let res = await proxy.$api.getCountData();
      countData.value = res;
    };
    // 关于echart表格渲染部分数据
    let xOptions = reactive({
      // 图例文字颜色
      textStyle: {
        color: "#333",
      },
      grid: {
        left: "20%",
      },
      // 提示框
      tooltip: {
        trigger: "axis",
      },
      // x轴的一些配置
      xAxis: {
        type: "category", //类目轴
        data: [],
        axisLine: {
          lineStyle: {
            color: "#17b3a3",
          },
        },
        axisLabel: {
          interval: 0,
          color: "#333",
        },
      },
      // y轴一些配置
      yAxis: [
        {
          type: "value",
          axisLine: {
            lineStyle: {
              color: "#17b3a3",
            },
          },
        },
      ],
      color: ["#2ec7c9", "#b6a2de", "#5ab1ef", "#ffb980", "#8d98b3"],
      series: [],
    });
    // 饼状图数据
    let pieOptions = reactive({
      tooltip: {
        trigger: "item",
      },
      color: ["#0f78f4", "#dd536b", "#9462e5", "#a6a6a6", "#e1bb22", "#39c362"],
      series: [],
    });
    // 响应式接收echart中的order数据
    let orderData = reactive({
      // 接收x轴数据
      xData: [],
      series: [],
    });
    let userData = reactive({
      // 接收x轴数据
      xData: [],
      series: [],
    });
    // 饼状图数据
    let videoData = reactive({
      series: [],
    });
    // 异步请求获取首页echart数据
    const getEchartData = async () => {
      let result = await proxy.$api.getEchartData();
      // console.log(result);
      // 将数据进行分分配
      let orderRes = result.orderData;
      let userRes = result.userData;
      let videoRes = result.videoData;
      // 折线图渲染，以及数据分配
      orderData.xData = orderRes.Data;
      const keyArray = Object.keys(orderRes.data[0]);
      const series = [];
      keyArray.forEach((key) => {
        series.push({
          name: key,
          data: orderRes.data.map((item) => item[key]),
          type: "line",
        });
      });
      orderData.series = series;
      xOptions.xAxis.data = orderData.xData;
      xOptions.series = orderData.series;
      // 折线图进行渲染
      let hEcharts = echarts.init(proxy.$refs["echart"]);
      hEcharts.setOption(xOptions);

      // 柱状图进行渲染
      userData.xData = userRes.map((item) => item.data);
      userData.series = [
        // 写死
        {
          name: "新增用户",
          data: userRes.map((item) => item.new),
          type: "bar",
        },
        {
          name: "活跃用户",
          data: userRes.map((item) => item.active),
          type: "bar",
        },
      ];
      xOptions.xAxis.data = userData.xData;
      xOptions.series = userData.series;
      // 柱状图渲染
      let uEcharts = echarts.init(proxy.$refs["userEchart"]);
      uEcharts.setOption(xOptions);
      // 饼状图渲染
      videoData.series = [
        {
          data: videoRes,
          type: "pie",
          itemStyle: {
            borderRadius: 6,
          },
        },
      ];
      pieOptions.series = videoData.series;
      let vEcharts = echarts.init(proxy.$refs["videoEchart"]);
      vEcharts.setOption(pieOptions);
    };

    onBeforeMount(() => {
      getTableList();
      getCountData();
      getEchartData();
    });
    return {
      tableData,
      tableLabel,
      countData,
    };
  },
});
</script>
<style lang="less" scoped>
.home {
  .user {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 1px solid #ccc;
    img {
      height: 2rem;
      width: 2rem;
      border-radius: 50%;
      margin-right: 60px;
    }
    .userInfo {
      font-size: 0.5rem;
      font-weight: 500;
      p {
        margin-bottom: 0.2rem;
      }
    }
  }
  .login-info {
    padding-top: 10px;
    p {
      line-height: 30px;
      font-size: 14px;
      color: #999;
      span {
        color: #666;
        margin-left: 1rem;
      }
    }
  }
  .countDetail {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .el-card {
      width: 30%;
      margin-bottom: 30px;
    }
    .icons {
      width: 1.6rem;
      height: 1.6rem;
    }
    .details {
      display: flex;
      text-align: center;
      margin-left: 0.5rem;
      // 变成竖行排列并居中
      flex-direction: column;
      justify-content: center;
      .price {
        font-weight: 600;
        font-size: 0.5rem;
        margin-bottom: 0.2rem;
      }
      .txt {
        font-size: 0.32rem;
        text-align: center;
        color: #999;
      }
    }
  }
  .graph {
    display: flex;
    justify-content: space-between;
    margin-top: 0.4rem;
    .el-card {
      width: 48%;
    }
  }
}
</style>
