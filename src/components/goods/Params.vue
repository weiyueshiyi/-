<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>参数列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-alert title="注意：只允许为第三级分类设置相关参数" type="warning" :closable="false" show-icon></el-alert>
      <el-row class="cat_opt">
        <el-col>
          <span>选择商品分类：</span>
          <el-cascader
            v-model="seletedCatKeys"
            :options="catelist"
            expand-trigger="hover"
            :props="cateProps"
            @change="handleChange"
            clearable
            change-on-select
          ></el-cascader>
        </el-col>
      </el-row>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="动态参数" name="many">
          <el-button type="primary" size="mini" :disabled="isBtnDisabled">添加参数</el-button>
        </el-tab-pane>
        <el-tab-pane label="静态属性" name="only">
          <el-button type="primary" size="mini" :disabled="isBtnDisabled">添加属性</el-button>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      catelist: [],
      cateProps: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children'
      },
      seletedCatKeys: [],
      // 被激活的页签名称
      activeName: 'many'
    }
  },
  created() {
    this.getCateList()
  },
  computed: {
    // 如果按钮需要被禁用
    isBtnDisabled() {
      if (this.seletedCatKeys.length !== 3) {
        return true
      }
      return false
    },
    cateId() {
      if (this.seletedCatKeys.length === 3) {
        return this.seletedCatKeys[2]
      }
      return null
    }
  },
  methods: {
    async getCateList() {
      const { data: res } = await this.$http.get('categories')
      if (res.meta.status !== 200) {
        return this.$message.error('获取分类数据失败')
      }
      this.catelist = res.data
    },
    handleChange() {
      if (this.seletedCatKeys.length !== 3) {
        this.seletedCatKeys = []
        return
      }
      console.log(this.seletedCatKeys)
    },
    // async handleChange() {
    //   // 此时选中的不是三级分类
    //   if (this.seletedCatKeys.length !== 3) {
    //     this.seletedCatKeys = []
    //   }
    //   // 根据所选分类的id和当前所处的面板获取对应的参数
    //   const { data: res } = await this.$http.get(`categories/${this.cateId}/attributes`, {
    //     params: { sel: this.activeName }
    //   })
    //   console.log(res.data)
    // },
    // 点击切换标签栏
    handleClick() {}
  }
}
</script>
<style lang="less" scoped>
.cat_opt {
  margin: 15px 0;
}
</style>
