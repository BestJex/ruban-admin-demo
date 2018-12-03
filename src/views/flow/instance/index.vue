<template>
<div>
    <el-tabs value="first" type="card" @tab-click="tabClick">
        <el-tab-pane label="流程操作" name="first">
            <el-collapse v-model="collapseValue">
                <el-collapse-item title="业务信息" name="1">
                    <div>与现实生活一致：与现实生活的流程、逻辑保持一致，遵循用户习惯的语言和概念；</div>
                    <div>在界面中一致：所有的元素和结构需保持一致，比如：设计样式、图标和文本、元素的位置等。</div>
                </el-collapse-item>
                <el-collapse-item title="申请信息" name="3">
                    <el-form label-width="160px" :model="instanceIdInfo" :disabled="collapse2FormDisable">
                        <el-form-item label="当前节点名称">
                            <el-input v-model="instanceIdInfo.nodeName" :disabled="collapse2FormDisable"></el-input>
                        </el-form-item>
                        <el-form-item label="当前节点">
                            <el-input v-model="instanceIdInfo.nodeId" :disabled="collapse2FormDisable"></el-input>
                        </el-form-item>
                        <el-form-item label="流程实例">
                            <el-input v-model="instanceIdInfo.instanceId" :disabled="collapse2FormDisable"></el-input>
                        </el-form-item>
                        <el-form-item label="流程名称">
                            <el-input v-model="instanceIdInfo.flowName" :disabled="collapse2FormDisable"></el-input>
                        </el-form-item>
                        <el-form-item label="发起者姓名">
                            <el-input v-model="instanceIdInfo.flowStarterName" :disabled="collapse2FormDisable"></el-input>
                        </el-form-item>
                        <el-form-item label="客户名称">
                            <el-input v-model="instanceIdInfo.bizUserName" :disabled="collapse2FormDisable"></el-input>
                        </el-form-item>
                        <el-form-item label="客户ID">
                            <el-input v-model="instanceIdInfo.bizUserId" :disabled="collapse2FormDisable"></el-input>
                        </el-form-item>
                        <el-form-item label="上一节点名称">
                            <el-input v-model="instanceIdInfo.lastNodeName" :disabled="collapse2FormDisable"></el-input>
                        </el-form-item>
                        <el-form-item label="上一节点">
                            <el-input v-model="instanceIdInfo.lastNodeId" :disabled="collapse2FormDisable"></el-input>
                        </el-form-item>
                    </el-form>
                </el-collapse-item>
                <el-collapse-item title="提交处理" name="4">
                    <el-form ref="commentForm" label-width="160px" :model="commentInfo" :rules="commentRules">
                        <el-form-item label="主键">
                            <el-input v-model="commentInfo.commentId" :disabled="collapse2FormDisable"></el-input>
                        </el-form-item>
                        <el-form-item label="意见" prop="userComment">
                            <el-input type="textarea" v-model="commentInfo.userComment" :disabled="button.signIn==1"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="cancel">取消</el-button>
                            <el-button type="primary" @click="saveComment" :disabled="button.signIn==1">保存</el-button>
                            <el-button type="primary" @click="submit('O-12')" :disabled="button.signIn==1">同意</el-button>
                            <el-button type="primary" @click="signIn" :disabled="button.signIn!=1">签收</el-button>
                            <el-button type="primary" @click="unSignIn" :disabled="button.unSignIn!=1">撤销签收</el-button>
                            <el-button type="primary" @click="submit">打回</el-button>
                            <el-button type="primary" @click="submit">退回</el-button>
                            <el-button type="primary" @click="submit">跳转</el-button>
                            <el-button type="primary" @click="submit">转办</el-button>
                            <el-button type="primary" @click="submit">协办</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submit">挂起</el-button>
                            <el-button type="primary" @click="submit">唤醒</el-button>
                            <el-button type="primary" @click="submit">拿回</el-button>
                            <el-button type="primary" @click="submit">否决</el-button>
                            <el-button type="primary" @click="submit">催办</el-button>
                        </el-form-item>
                    </el-form>
                </el-collapse-item>
            </el-collapse>
        </el-tab-pane>
        <el-tab-pane label="审批历史" name="second">
            <el-table :data="commentTableData" style="width: 100%">
                <el-table-column prop="nodeName" label="节点名称">
                </el-table-column>
                <el-table-column prop="nodeId" label="节点id">
                </el-table-column>
                <el-table-column prop="userName" label="处理人">
                </el-table-column>
                <el-table-column prop="userId" label="处理人ID">
                </el-table-column>
                <el-table-column prop="startTime" label="处理时间">
                </el-table-column>
                <el-table-column prop="commentSign" label="操作类型">
                </el-table-column>
                <el-table-column prop="userComment" label="处理意见">
                </el-table-column>
            </el-table>
        </el-tab-pane>
        <el-tab-pane label="参数修改" name="3">
            <el-card class="box-card">
                <el-form ref="paramFrom">
                    <el-form-item v-for="item in flowParam" :label="item.key">
                        <el-input v-model="item.value" size="mini"></el-input>
                    </el-form-item>
                </el-form>
            </el-card>
        </el-tab-pane>
    </el-tabs>


    <el-dialog :title="agreeNodeSelect.title" :visible.sync="agreeNodeSelect.showDialog" @open="agreeDialogOpen">
        <el-form ref="form" label-width="80px">
            <el-form-item v-for="(node,index) in agreeNextNodes" v-if="agreeShowRadio">
                <el-col :span="8">
                    <el-radio v-model="agreeRadio" :label="node.nodeId">{{node.nodeName}}</el-radio>
                </el-col>
                <el-col :span="8">
                    <el-input v-model="node.userSelected" type="textarea" autosize></el-input>
                </el-col>
                <el-col :span="3">
                    <el-button @click="agreeSelectNodeUser(node,index)">选择</el-button>
                </el-col>
            </el-form-item>
            <el-checkbox-group v-model="agreeCheckBox" v-if="!agreeShowRadio">
                <el-form-item v-for="(node,index) in agreeNextNodes">
                    <el-col :span="8">
                        <el-checkbox :label="node.nodeId" :key="node.nodeId">{{node.nodeName}}</el-checkbox>
                    </el-col>
                    <el-col :span="8">
                        <el-input v-model="node.userSelected" type="textarea" autosize></el-input>
                    </el-col>
                    <el-col :span="3">
                        <el-button @click="agreeSelectNodeUser(node,index)">选择</el-button>
                    </el-col>
                </el-form-item>
            </el-checkbox-group>
            <el-form-item label="提前提交" v-if="(instanceIdInfo.handleType==5||instanceIdInfo.handleType==6)">
                <el-col :span="4">
                    <el-radio v-model="agreeIsLastRadio" label="N">否</el-radio>
                </el-col>
                <el-col :span="4">
                        <el-radio v-model="agreeIsLastRadio" label="Y">是</el-radio>
                </el-col>
            </el-form-item>
        </el-form>
        <div slot="footer">
            <el-button type="primary" @click="agree">提交</el-button>
        </div>
    </el-dialog>
    <el-dialog :title="agreeNodeSelect.userTitle" :visible.sync="agreeNodeSelect.showUserDialog">
        <el-card class="box-card" v-show="agreeNextNodes[agreeIndex]!=undefined">
            <el-tag v-for="tag in agreeNextNodes[agreeIndex].userInfos" :key="tag.userId" type="success" closable @close="agreeTagClose(tag)">
                {{tag.userName}}
            </el-tag>
        </el-card>
        <el-table ref="agreeUserTableRef" :data="agreeNodeSelect.userTableData" @row-dblclick="agreeRowDbClick">
            <el-table-column prop="userId" label="用户ID">
            </el-table-column>
            <el-table-column prop="userName" label="姓名" width="180">
            </el-table-column>
        </el-table>
        <div style="margin-top: 20px">
            <el-button @click="agreeUserClose">选取返回</el-button>
        </div>
    </el-dialog>
</div>
</template>
<script>
import { getComments } from "@/api/flow";
import { instanceInfo } from "@/api/flow";
import { saveComment } from "@/api/flow";
import { signIn } from "@/api/flow";
import { unSignIn } from "@/api/flow";
import { submit } from "@/api/flow";
import { agreeNodeSelect } from "@/api/flow";
import { agreeSelectNodeUser } from "@/api/flow";
export default {
  data() {
    return {
      collapseValue: ["3", "4"],
      collapse2FormDisable: true,
      urls: {
        index: "/api/bench/todo",
        instanceInfo: "/api/core/instanceInfo",
        saveComment: "/api/core/saveComment/",
        signIn: "/api/core/signIn/",
        unSignIn: "/api/core/unSignIn/",
        getComments: "/api/core/getComments/",
        getNextNodeInfos: "/api/core/getNextNodeInfos/",
        submit: "/api/core/submit"
      },
      currentOrgId: "0000",
      currentUserId: "",
      returnBackFuncId: "",
      returnBackRootId: "",
      instanceIdInfo: {
        instanceId: "",
        flowName: "",
        flowId: "",
        flowStarter: "",
        flowStarterName: "",
        startTime: "",
        systemId: "",
        orgId: "",
        flowState: "",
        bizId: "",
        bizUserName: "",
        bizUserId: "",
        lastNodeId: "",
        lastNodeName: "",
        nodeId: "",
        nodeSign: "",
        nodeName: "",
        nodeState: "",
        nodeType: "",
        handleType: "",
        opType: {}
      },
      commentInfo: {
        instanceId: "",
        nodeId: "",
        userId: "",
        commentId: "",
        commentSign: "O-12",
        userComment: ""
      },
      flowParam: [],
      commentRules: {
        userComment: [
          { required: true, message: "请填写意见", trigger: "blur" }
        ]
      },
      opNames: {
        // 操作权限常量列表
        submit: { label: "同意", value: "O-12" },
        callBack: { label: "打回", value: "O-1" },
        jump: { label: "跳转", value: "O-9" },
        returnBack: { label: "退回", value: "O-2" },
        change: { label: "转办", value: "O-6" },
        assist: { label: "协办", value: "O-7" },
        tackBack: { label: "拿回", value: "O-0" },
        refuse: { label: "否决", value: "O-8" }
      },
      button: {
        // 按钮权限控制
        submit: "1",
        callBack: "0",
        entrust: "0",
        copy: "0",
        jump: "0",
        returnBack: "0",
        change: "0",
        unSignIn: "0",
        signIn: "0",
        assist: "0",
        hangUp: "",
        wackUp: "0",
        tackBack: "0",
        refuse: "0",
        urged: "0"
      },
      commentTableData: [],
      agreeNodeSelect: {
        title: "同意提交",
        showDialog: false,
        nodeUrl: "/api/core/getNextNodeInfos/",
        userTitle: "办理人员选择",
        showUserDialog: false,
        userUrl: "/api/core/getNodeUsers",
        userTableData: []
      },
      agreeIndex: 0,
      agreeNextNodes: [{}],
      agreeShowRadio: false,
      agreeRadio: "",
      agreeCheckBox: [],
      agreeIsLastRadio: "N"
    };
  },
  created() {
    this.instanceIdInfo.instanceId = this.$route.query.data.instanceId;
    this.instanceIdInfo.nodeId = this.$route.query.data.nodeId;
    this.returnBackFuncId = this.$route.query.data.returnBackFuncId;
    this.returnBackRootId = this.$route.query.data.returnBackRootId;
    this.currentUserId = this.$route.query.data.userId;
    this.instanceInfoFn(this.$route.query.data);
  },
  methods: {
    tabClick: function(tab, event) {
      var _this = this;
      if (tab.name == "second") {
        getComments({ instanceId: _this.instanceIdInfo.instanceId }).then(
          response => {
            if (response.code == 0) {
              _this.commentTableData = response.data;
            }
          }
        );
      }
    },
    instanceInfoFn: function(param) {
      var _this = this;
      instanceInfo(param).then(
        response => {
          if (response.code == 0) {
            _this.instanceIdInfo = response.data;
            if (null != response.data.comment) {
              // 设置评论反显
              _this.commentInfo = response.data.comment;
            }
            _this.commentInfo.instanceId = _this.instanceIdInfo.instanceId;
            _this.commentInfo.nodeId = _this.instanceIdInfo.nodeId;
            _this.commentInfo.userId = _this.currentUserId;

            // 按钮权限
            if (null != response.data.opType) {
              for (var key in _this.button) {
                var value = response.data.opType[key];
                if (value == 1) {
                  _this.button[key] = 1;
                }
              }
            }

            if (null != response.data.param) {
              // 流程参数初始化
              for (var key in response.data.param) {
                var paramTT = {};
                paramTT.key = key;
                paramTT.value = response.data.param[key];
                _this.flowParam.push(paramTT);
              }
            }
          }
        }
      );
    },
    cancel: function() {
      // 跳转到之前的页面
      var _this = this;
      this.$router.push({
        path: _this.returnBackFuncId,
        query: {
          t: +new Date() //保证每次点击路由的query项都是不一样的，确保会重新刷新view
        }
      });
    },
    saveComment: function() {
      // 保存评论
      var _this = this;
      this.$refs["commentForm"].validate(valid => {
        if (valid) {
          var data = _this.instanceIdInfo;
          data.userId = _this.currentUserId;
          data.commentId = _this.commentInfo.commentId;
          data.userComment = _this.commentInfo.userComment;
          data.commentSign = "O-12";
          saveComment(data).then(
            response => {
              if (response.code == 0) {
                if (response.data != null) {
                  _this.$message("保存成功");
                  _this.$refs["commentForm"].resetFields(); // 重置表单
                  _this.commentInfo = response.data;
                } else {
                  _this.$message({ message: "保存意见失败", type: "error" });
                }
              }
            }
          );
        } else {
          _this.$message({ message: "填写意见并选择操作", type: "warn" });
          return false;
        }
      });
    },
    signIn: function() {
      //签收
      var _this = this;
      _this.instanceIdInfo.userId = _this.currentUserId;
      signIn(_this.instanceIdInfo).then(
        response => {
          if (response.code == 0) {
            // 跳转到之前的页面
            var _this = this;
            this.$router.push({
              path: _this.returnBackFuncId,
              query: {
                t: +new Date() //保证每次点击路由的query项都是不一样的，确保会重新刷新view
              }
            });
          }
        }
      );
    },
    unSignIn: function() {
      var _this = this;
      _this.instanceIdInfo.userId = _this.currentUserId;
      unSignIn(_this.instanceIdInfo).then(
        response => {
          if (response.code == 0) {
            // 跳转到之前的页面
            var _this = this;
            this.$router.push({
              path: _this.returnBackFuncId,
              query: {
                t: +new Date() //保证每次点击路由的query项都是不一样的，确保会重新刷新view
              }
            });
          }
        }
      );
    },
    submit: function(opType) {
      var _this = this;
      if (opType == "O-12") {
        // 同意提交
        _this.agreeNodeSelect.showDialog = true;
      }
    },
    agree: function() {
      // 节点提交
      // 遍历选中节点
      var nodes = [];
      if (this.agreeRadio != "") {
        nodes.push(this.agreeRadio);
      }

      if (this.agreeCheckBox.length > 0) {
        for (var i = 0; i < this.agreeCheckBox.length; i++) {
          nodes.push(this.agreeCheckBox[i]);
        }
      }
      var nodeInfos = [];
      for (var i = 0; i < nodes.length; i++) {
        for (var j = 0; j < this.agreeNextNodes.length; j++) {
          if (this.agreeNextNodes[j].nodeId == nodes[i]) {
            var nodeInfo = {};
            nodeInfo.nextNodeId = nodes[i];
            var nextUser = [];
            for (var i = 0; i < this.agreeNextNodes[j].userInfos.length; i++) {
              // 去重
              nextUser.push(this.agreeNextNodes[j].userInfos[i].userId);
            }
            nodeInfo.nextNodeUserIds = nextUser;
            nodeInfos.push(nodeInfo);
          }
        }
      }
      // 获取节点选择的处理人
      var _this = this;
      console.info(nodeInfos);
      if (nodeInfos.length == 0) {
        _this.$message({ message: "选择节点" });
        return;
      } else {
        for (var i = 0; i < nodeInfos.length; i++) {
          if (nodeInfos[i].nextNodeUserIds.length == 0) {
            _this.$message({ message: "选择节点处理人" });
            return;
          }
        }
      }

      var param = {};
      if (_this.agreeIsLastRadio == "Y") {
        //是否直接提交， 一般【办理类型】是[多人顺序可结束]或[多人并行可结束]时生效，可以选择true和false;
        param.lastOne = true;
      }
      param.orgId = _this.currentOrgId;
      param.nextNodeInfos = nodeInfos;
      // 流程评论提交
      if (_this.commentInfo.userComment == "") {
        _this.commentInfo.userComment = "[同意]";
        _this.commentInfo.commentSign = "O-12";
      }
      param.comment = _this.commentInfo;
      var paramWF = {};
      for (var i = 0; i < _this.flowParam.length; i++) {
        // 流程参数提交
        paramWF[_this.flowParam[i].key] = _this.flowParam[i].value;
      }
      param.param = paramWF;

      submit(param).then(
        response => {
          if (response.code == 0) {
            for (var i = 0; i < response.data.length; i++) {
              _this.$message(  response.data[i].tip + ";" +  response.data[i].nodeName + "@" + response.data[i].userNames);
            }
            // 跳转到之前的页面
            _this.$router.push({
              path: _this.returnBackFuncId,
              query: {
                t: +new Date() //保证每次点击路由的query项都是不一样的，确保会重新刷新view
              }
            });
          }
        }
      );
    },
    agreeDialogOpen: function() {
      var _this = this;
      agreeNodeSelect(_this.instanceIdInfo).then(
        response => {
          if (response.code == 0) {
           // 跳转到之前的页面
            if ( _this.instanceIdInfo.nodeType == "0" || _this.instanceIdInfo.nodeType == "1" || _this.instanceIdInfo.nodeType == "3" ) {
              _this.agreeNextNodes = response.data;
              _this.agreeShowRadio = true;
            } else {
              // 非单选节点
              _this.agreeNextNodes = response.data;
              _this.agreeShowRadio = false;
            }
          }
        }
      );
    },
    agreeSelectNodeUser: function(node, index) {
      this.agreeIndex = index;
      this.agreeNodeSelect.showUserDialog = true;
      this.agreeUserDialogOpen(node.nodeId);
    },
    agreeUserDialogOpen: function(nodeId) {
      var _this = this;
      var nodeInfo = {};
      nodeInfo.instanceId = _this.instanceIdInfo.instanceId;
      nodeInfo.nodeId = nodeId;
      var param = { condition: JSON.stringify(nodeInfo) };
      agreeSelectNodeUser(param).then(
        response => {
          _this.agreeNodeSelect.userTableData = response.data;
        }
      );
    },
    agreeRowDbClick: function(row, event) {
      var user = {};
      user.userId = row.userId;
      user.userName = row.userName;
      if (this.agreeNextNodes[this.agreeIndex].userInfos == undefined) {
        // this.agreeNextNodes[this.agreeIndex].userInfos = [];
        this.$set(this.agreeNextNodes[this.agreeIndex], "userInfos", []);
      }
      var userInfosT = this.agreeNextNodes[this.agreeIndex].userInfos;
      for (var i = 0; i < userInfosT.length; i++) {
        // 去重
        if (userInfosT[i].userId == user.userId) {
          return;
        }
      }
      userInfosT.push(user);
    },
    agreeTagClose: function(tag) {
      if (this.agreeNextNodes[this.agreeIndex].userInfos == undefined) {
        this.$set(this.agreeNextNodes[this.agreeIndex], "userInfos", []);
      }
      var userInfosT = this.agreeNextNodes[this.agreeIndex].userInfos;
      userInfosT.splice(userInfosT.indexOf(tag), 1);
    },
    agreeUserClose: function() {
      this.agreeNodeSelect.showUserDialog = false;
      var userName = "";
      if (this.agreeNextNodes[this.agreeIndex].userInfos == undefined) {
        this.$set(this.agreeNextNodes[this.agreeIndex], "userInfos", []);
      }
      var userInfosT = this.agreeNextNodes[this.agreeIndex].userInfos;
      for (var i = 0; i < userInfosT.length; i++) {
        userName = userName + userInfosT[i].userName + ";";
      }
      this.agreeNextNodes[this.agreeIndex].userSelected = userName;
    }
  }
};
</script>

