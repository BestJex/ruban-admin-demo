<template>
  <div class="app-container">
    <el-form ref="form" :model="wfDemo" label-width="200px">
        <el-form-item label="申请流水号">
            <el-input v-model="wfDemo.pkId"></el-input>
        </el-form-item>
        <el-form-item label="业务类型">
                <el-input v-model="wfDemo.type"></el-input>
            </el-form-item>
        <el-form-item label="客户名称">
            <el-input v-model="wfDemo.name"></el-input>
        </el-form-item>
        <el-form-item label="客户ID">
            <el-input v-model="wfDemo.id"></el-input>
        </el-form-item>
        <el-form-item label="流程列表">
            <el-select v-model="wfDemo.flowId" placeholder="请选择流程">
                <el-option v-for="item in wfDemo.wfs" :label="item.flowName" :value="item.flowId"/>
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-button @click="start" type="primary">发起流程</el-button>
            <el-button @click="reSet">重置流水号</el-button>
        </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { getFlows } from "@/api/flow";
import { start } from "@/api/flow";
export default {
  data() {
    return {
      wfDemo: {
        pkId: "12345678",
        type: "DKSQ",
        name: "客户-王亚飞",
        id: "wangyf10",
        flowId: "",
        wfs: []
      }
    };
  },
  created() {
    this.getFlow();
    this.reSet();
  },
  methods: {
    reSet: function() {
      var myDate = new Date();
      this.wfDemo.pkId = myDate.toLocaleString(); //获取日期与时间
    },
    getFlow: function() {
      var _this = this;
      getFlows(this.listQuery).then(response => {
        for (var i = 0; i < response.data.flows.length; i++) {
          var flowT = {};
          flowT.flowId = response.data.flows[i].flowId;
          flowT.flowName = response.data.flows[i].flowName;
          _this.wfDemo.wfs.push(flowT);
        }
      });
    },
    start: function() {
      var _this = this;
      var startdto = {};
      startdto.flowId = _this.wfDemo.flowId;
      startdto.systemId = "cmis";
      startdto.orgId = "0000";
      startdto.userId = "admin";
      startdto.bizId = _this.wfDemo.pkId;
      startdto.bizType = _this.wfDemo.type;
      startdto.bizUserName = _this.wfDemo.name;
      startdto.bizUserId = _this.wfDemo.id;
      startdto.param = { 金额: "10000" };
      console.info(startdto);
      
      start(startdto).then(response => {
        if (response.code == 0) {
            if (response.data.flowStarterName) {
              _this.$message(
                response.data.flowStarterName +
                  "成功发起" +
                  response.data.flowName
              );
            }
            _this.reSet();
          }
      });
    }
  }
};
</script>

