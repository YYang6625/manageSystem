<template>
  <div class="table">
    <div class="table-top">
      <el-button bg type="success" text @click="handleOpen">新增 +</el-button>
      <!-- inline设置为一行 -->
      <el-form :inline="true">
        <el-form-item label="搜索">
          <el-input placeholder="请输入名称" v-model="selectUser"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" round @click="onSubmit(selectUser)"
            >查询</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <el-dialog
      v-model="dialogVisible"
      title="新增用户"
      width="800px"
      :before-close="handleClose"
      :v-if="dialogVisible"
    >
      <!-- 用户的表单信息(将原本的span内容换成form表单) -->
      <!-- element提供了表单验证功能，利用rules验证表单，并利用form表单提供的validate事件检测是否通过 -->
      <el-form
        ref="form"
        :rules="rules"
        :inline="true"
        :model="formUser"
        label-width="120px"
      >
        <!-- 再给item添加prop绑定要求即可 -->
        <el-form-item label="姓名" prop="name">
          <el-input placeholder="请输入姓名" v-model="formUser.name"></el-input>
        </el-form-item>
        <el-form-item label="年龄" prop="age">
          <el-input placeholder="请输入年龄" v-model="formUser.age"></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="sex">
          <el-select placeholder="请选择" v-model="formUser.sex">
            <el-option label="男" value="1" />
            <el-option label="女" value="0" />
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" prop="birth">
          <el-date-picker
            v-model="formUser.birth"
            type="date"
            placeholder="选择日期"
            :default-value="new Date(2022, 1, 1)"
            format="YYYY/MM/DD"
            value-format="YYYY-MM-DD"
          />
        </el-form-item>
        <el-form-item label="地址" prop="addr">
          <el-input placeholder="请输入地址" v-model="formUser.addr"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="cancel">取消</el-button>
          <!-- 添加数据之后利用回调函数进行提交数据 -->
          <el-button type="primary" @click="submit">确定</el-button>
        </span>
      </template>
    </el-dialog>
    <!-- 当设置了height时,超过高度会自动用滚动条显示 -->
    <!-- 利用组件自带的设置行内样式row-style进行设置行高 -->
    <el-table
      ref="table"
      stripe
      :data="transit.userList"
      style="width: 100%"
      :height="transit.totalHeight"
      :row-style="{ height: transit.height + 'px' }"
    >
      <!-- label是表头展示 prop则是对应数据 需要和userList对应-->
      <el-table-column
        v-for="item in tableLabel"
        :key="item.prop"
        :label="item.label"
        :prop="item.prop"
        :width="item.width ? item.width : 280"
      />
      <el-table-column fixed="right" label="操作" min-width="160">
        <template #default="scope">
          <el-button size="small" @click.stop="EditUser(scope.row)"
            >编辑</el-button
          >
          <el-button type="danger" size="small" @click="removeUser(scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 由于没有数据,用蠢方法拷贝足够数据之后来替代total中的总数 -->
    <el-pagination
      ref="page"
      small
      background
      layout="prev, pager, next"
      :total="transit.userList.length"
      class="mt-4"
      @prev-click="prevClick"
      @next-click="nextClick"
      @current-change="getPageNum"
    />
  </div>
</template>
<script>
import {
  getCurrentInstance,
  onMounted,
  defineComponent,
  ref,
  reactive,
} from "@vue/runtime-core";
import { useTransit } from "../../store/index.js";
export default defineComponent({
  setup() {
    const currentPage = ref(null);
    // 引入仓库store
    const transit = useTransit();
    // 对话框先不显示(v-model控制显示传入值false)
    const dialogVisible = ref(false);
    // 代理this
    const { proxy } = getCurrentInstance();
    // 接收用户信息
    const list = ref([]);
    const selectUser = ref([]);
    // 添加用户信息
    const formUser = reactive({
      name: "",
      age: "",
      sex: "",
      birth: "",
      addr: "",
    });
    // 设置空值
    const voidUser = {
      name: "",
      age: "",
      sex: "",
      birth: "",
      addr: "",
    };
    // 定义变量控制提交时是新增还是编辑
    const modelControl = ref(0);
    // 表头的设置
    const tableLabel = reactive([
      {
        prop: "name",
        label: "姓名",
      },
      {
        prop: "age",
        label: "年龄",
      },
      {
        prop: "sex",
        label: "性别",
      },
      {
        prop: "birth",
        label: "出生日期",
        width: 200,
      },
      {
        prop: "addr",
        label: "地址",
        width: 320,
      },
    ]);
    // 双向绑定数据(引用类型)
    const rules = {
      // 以下required表示表单为必填选项，未填写后显示下面的信息
      name: [
        {
          required: true,
          message: "请输入姓名",
        },
      ],
      age: [
        {
          required: true,
          message: "请输入年龄",
        },
      ],
      sex: [
        {
          required: true,
          message: "请选择性别",
        },
      ],
      birth: [
        {
          required: true,
          message: "请选择出生日期",
        },
      ],
      addr: [
        {
          required: true,
          message: "请填写地址",
        },
      ],
    };
    onMounted(() => {
      getUserData();
    });
    // 获取用户数据
    const getUserData = async () => {
      // 利用proxy中的指向设置全局的api(steup是没有this的)
      let res = await proxy.$api.getUserData();
      // 将数据赋值给list，并对性别做处理
      list.value = res.data.map((item) => {
        item.name = item.name.trim();
        item.sex = item.sex === 0 ? "女" : "男";
        // 需要返回值item
        return item;
      });
      // 由于没有后端接口数据mock处理,这里自己在store进行操作
      // console.log(list.value);
      transit.fetchUserData(list.value);
    };
    // 新增提交数据
    const submit = () => {
      proxy.dialogVisible = false;
      // 提交用户表单(利用proxy指向当前form组件)
      proxy.$refs.form.validate((valid) => {
        // 利用element表单事件validate返回的布尔值判断数据是否通过校验
        if (valid) {
          // 判断是新增还是编辑(新增为0，编辑为1)
          if (proxy.modelControl === 0) {
            // 在清空数据之前将数据发送出去
            proxy.formUser.sex = proxy.formUser.sex === 0 ? "女" : "男";
            transit.adduser(proxy.formUser);
            // 通过之后就能获取到数据
            // console.log(proxy.formUser, "form");
            // 关闭弹窗需要使用this指向变量才会生效,之后需要将数据清空(利用elementui的form事件即可)
          }
          if (proxy.modelControl === 1) {
            transit.EditUser(proxy.formUser);
            proxy.$refs.form.clearValidate();
            console.log(proxy.$refs.form);
            // location.reload();
          }
        }
      });
    };
    // 在弹窗关闭之前清空表单数据，利用dialog事件before-close(事件只会在用户点击关闭按钮或对话框时才会被调用)
    const handleClose = () => {
      // 使用事件之后会发现关闭处的dialogVisible失效了需要手动添加
      proxy.dialogVisible = false;
      // 如果时新增就直接清空
      if (proxy.modelControl === 0) {
        proxy.$refs.form.resetFields();
      }
    };
    // 新增前清空数据
    const handleOpen = () => {
      proxy.modelControl = 0;
      // resetFields:将所有字段重置为初始值并移除校验结果
      // 先调用编辑回显再调用新增 this.$ref['form'] .resetFields()无法重置表单项
      // 原因:调用编辑的时候，表单的初始值被设置为回显(编辑显示)的值，每次重置时只是重置为初始值，不是空值。
      // 解决方案见编辑数据函数中
      proxy.dialogVisible = true;
      // 使初始值为空
      if (proxy.$refs.form !== undefined) {
        proxy.$refs.form.resetFields();
      }
    };
    // 取消按键由于不能触发before-close事件需要单独添加触发事件
    const cancel = () => {
      proxy.handleClose();
    };
    // 删除用户数据
    const removeUser = (userData) => {
      // 1.取巧：我们可以通过v-if/v-show控制隐藏，然后通过UI中table事件的cell-click/row-click来获取当前行row的数据
      // 获取id再去删除用户数据中的对应数据即可
      // 2.通过vue的插槽去获取数据 slot-scope 最新写法是 #default=scope 通过scope.row来获取当前行的数据
      // 也可用通过#default={row} 直接使用此行数据
      console.log(userData);
      transit.removeUserData(userData.id);
    };
    // 编辑数据
    const EditUser = (userData) => {
      proxy.modelControl = 1;
      proxy.dialogVisible = true;
      // 将点击的数据赋给表单(直接赋值，form初始值就变成此赋值，因为dialog和赋值时同步的)
      // 将赋值操作之后，这样的话userData也就不是赋值为初始值，而是修改后的值
      proxy.$nextTick(() => {
        // 直接赋值并不会显示数据，因为是在下一次DOM更新之后才会显示
        // proxy.formUser = userData;
        // 所以此时我们需要深拷贝创建一个新的值使其进行刷新，并且这样userData也不再是初始值
        // 这里对对象进行了修改所以会触发es6的set函数从而导致DOM更新而显示数据，上面写法并不会
        Object.assign(proxy.formUser, userData);
      });
    };
    // 搜索用户
    const onSubmit = (user) => {
      transit.selectUser(user);
    };
    // 上一页
    const prevClick = () => {
      proxy.$refs.table.setScrollTop(transit.height * 12 * currentPage.value);
    };
    // 下一页
    const nextClick = () => {
      proxy.$refs.table.setScrollTop(transit.height * 12 * currentPage.value);
    };
    // 页面发生改变就触发默认参数为currentPage当前页(改变之后的)
    const getPageNum = (val) => {
      currentPage.value = val - 1;
      proxy.$refs.table.setScrollTop(transit.height * 12 * currentPage.value);
    };
    return {
      getUserData,
      submit,
      handleClose,
      handleOpen,
      cancel,
      removeUser,
      EditUser,
      onSubmit,
      prevClick,
      nextClick,
      getPageNum,
      selectUser,
      list,
      tableLabel,
      dialogVisible,
      formUser,
      rules,
      transit,
      modelControl,
    };
  },
});
</script>
<style lang="less" scoped>
.table {
  width: 100%;
  height: 85%;
  .table-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 15px;
    padding: 0 0 0 10px;
  }
  .el-pagination {
    justify-content: center;
  }
  :deep(.el-table__inner-wrapper) {
    height: 100% !important;
    padding: 0 10px;
  }
}
</style>
