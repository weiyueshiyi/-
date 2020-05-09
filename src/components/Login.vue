<template>
  <div class="login_container">
    <div class="login_box">
    <div class="avatar_box">
      <el-image style="height:130px;width:130px; " src="https://s1.ax1x.com/2020/05/06/YVKS2T.md.jpg" fit="cover"></el-image>
    </div>
    <!-- 登录表单区 -->
    <el-form ref="loginFromRef" label-width="0px" class="login_from" :model="loginFrom" :rules="rule">
      <!-- 用户名 -->
  <el-form-item prop="username">
    <el-input prefix-icon="el-icon-user-solid" v-model="loginFrom.username" placeholder="请输入登录名"></el-input>
  </el-form-item>
  <!-- 密码 -->
  <el-form-item prop="password">
    <el-input prefix-icon="el-icon-unlock" v-model="loginFrom.password" type="password" placeholder="请输入密码"></el-input>
  </el-form-item>
  <!-- 按钮 -->
   <el-form-item class="btns">
   <el-button type="primary" @click="login">登录</el-button>
    <el-button type="info" @click="resetFromRef">重置</el-button>
  </el-form-item>
    </el-form>
    </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      loginFrom: {
        username: 'admin',
        password: '123456'
      },
      // 校验规则
      rule: {
        username: [
          { required: true, message: '请输入登录名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }]
      }
    }
  },
  methods: {
    // 登录
    login () {
      this.$refs.loginFromRef.validate(async valid => {
        if (!valid) return
        const { data: res } = await this.$http.post('login', this.loginFrom)
        if (res.meta.status !== 200) return this.$message.error('登录失败')
        this.$message.success('登录成功')
        // 成功后保存token
        window.sessionStorage.setItem('token', res.data.token)
        // 编程式导航跳转
        this.$router.push('/home')
      })
    },
    // 重置输入框
    resetFromRef () {
      this.$refs.loginFromRef.resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
.login_container{
  background-color: #2b4b6b;
  height: 100%;
}
.login_box{
  width: 450px;
  height: 300px;
  background: #fff;
  border-radius:3px;
  position:absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);

  .avatar_box{
    height: 130px;
    width:130px;
    border: 1px solid #eee;
    border-radius:50%;
    padding: 10px;
    box-shadow: 0 0 10px #ddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%,-50%);
    background: #fff;
    .el-image{
      height: 100%;
      width: 100%;
      border-radius:50%;
      background: #eee;
    }
  }
}
.login_from{
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}
.btns{
  display: flex;
  justify-content: flex-end;
}
</style>
