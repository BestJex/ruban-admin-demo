<template>
  <div class="app-container">
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="instanceId" label="流程实例">
        <template scope="scope">
        <div style="color:red;text-decoration:underline;cursor:pointer;" @click="rowDblclick(scope.row)">{{ scope.row.instanceId }}</div>
      </template>
      </el-table-column>
      <el-table-column v-if="false" prop="flowId" label="流程id"/>
      <el-table-column prop="flowName" label="流程名称"/>
      <el-table-column prop="flowAdmin" label="流程管理员"/>
      <el-table-column prop="flowStarter" label="流程发起者"/>
      <el-table-column prop="startTime" label="流程发起时间"/>
      <el-table-column prop="systemId" label="系统id"/>
      <el-table-column prop="orgId" label="发起人机构id"/>
      <el-table-column prop="flowState" label="流程状态"/>
      <el-table-column prop="bizId" label="业务流水号"/>
      <el-table-column prop="nodeId" label="节点"/>
      <el-table-column prop="nodeName" label="节点名称"/>
      <el-table-column prop="userId" label="节点处理人"/>
      <el-table-column prop="userName" label="节点处理人姓名"/>
      <el-table-column prop="lastNodeId" label="上一节点"/>
      <el-table-column prop="lastNodeName" label="上一节点名称"/>
      <el-table-column prop="lastUserId" label="上一节点处理人"/>
      <el-table-column prop="lastUserName" label="上一处理人姓名"/>
      <el-table-column prop="signIn" label="2-已签收,1-待签收,0-不需要签收"/>
      <el-table-column prop="bizUserName" label="客户名称"/>
      <el-table-column prop="bizUserId" label="客户id"/>
      <el-table-column prop="flowParam" label="流程参数"/>
      <el-table-column prop="bizType" label="业务类型"/>
    </el-table>
  </div>
</template>
<script>
import { getTodo } from "@/api/flow";
export default {
  data() {
    return {
      tableData: []
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      this.listLoading = true;
      getTodo(this.listQuery).then(response => {
        this.tableData = response.data;
      });
    },
    rowDblclick(row) {
      var param = {
        instanceId: row.instanceId,
        nodeId: row.nodeId,
        userId: row.userId,
        returnBackFuncId: '/myBench/todo',
        returnBackRootId: '/myBench/todo'
      };
      this.$router.push({
        path: "/hidden/instance",
        query: {
          data: param, // 页面跳转传参
          t: +new Date() //保证每次点击路由的query项都是不一样的，确保会重新刷新view
        }
      });
    }
  }
};
</script>

