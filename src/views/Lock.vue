<template>
  <div class="lock-container pull-height">
    <el-dialog title="请输入登录名和密码" :visible.sync="isShow" width="500px" append-to-body>
      <div class="lock-form animated bounceInDown">
        <!-- <div class="animated" :class="{'shake':passwdError,'bounceOut':pass}">
          
          <el-input
            placeholder="请输入登录密码"
            type="password"
            class="input-with-select animated"
            v-model="passwd"
            @keyup.enter.native="handleLogin"
          >
            <el-button slot="append" icon="icon-bofangqi-suoping" @click="handleLogin">登录</el-button>
            <el-button slot="append" icon="icon-tuichu" @click="handleLogout">登出</el-button>
          </el-input>
        </div>-->
        <el-form
          :model="lockForm"
          :rules="rules"
          ref="lockForm"
          label-width="100px"
          class="lockForm"
        >
          <el-form-item label="账号" prop="account">
            <el-input v-model="lockForm.account"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="lockForm.password"></el-input>
          </el-form-item>

          <el-form-item>
            <el-button @click="resetForm('lockForm')">取消</el-button>
            <el-button type="primary" @click="submitForm('lockForm')">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>
<script>
/**
 * 总体路由处理器
 */
export const resolveUrlPath = (url, name) => {

        let reqUrl = url;
        if (url.indexOf("http") != -1 || url.indexOf("https") != -1) {
            reqUrl = `/myiframe/urlPath?src=${reqUrl}&name=${name}`;
        } else {
            reqUrl = `${reqUrl}`;
        }
        return reqUrl;
}
// import { mapGetters, mapState } from "vuex";
// import { resolveUrlPath } from "@/util/util";
export default {
  name: "lock",
  data() {
    return {
      passwd: "",
      passwdError: false,
      pass: false,
      isShow: true,
      lockForm: {
        account: "",
        password: ""
      },
      rules: {}
    };
  },
  created() {},
  mounted() {},
  computed: {
    // ...mapState({
    //   userInfo: state => state.user.userInfo
    // }),
    // ...mapGetters(["tag", "lockPasswd"])
  },
  props: [],
  methods: {
    submitForm(form){

    },
    handleLogout() {
      this.$confirm("是否退出系统, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        this.$store.dispatch("LogOut").then(() => {
          this.$router.push({ path: "/login" });
        });
      });
    },
    handleLogin() {
      if (this.passwd != this.lockPasswd) {
        this.passwd = "";
        this.$message({
          message: "解锁密码错误,请重新输入",
          type: "error"
        });
        this.passwdError = true;
        setTimeout(() => {
          this.passwdError = false;
        }, 1000);
        return;
      }
      this.pass = true;
      setTimeout(() => {
        this.$store.commit("CLEAR_LOCK");
        this.$router.push({ path: resolveUrlPath(this.tag.value || "/") });
      }, 1000);
    }
  },
  components: {}
};
</script>

<style lang="less">
.lock-container {
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.6);
  position: relative;
}
.lock-container::before {
  z-index: -999;
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  //   background-image: url('../../../public/img/login.png');
  background-size: cover;
}
.lock-form {
  width: 300px;
}
</style>
