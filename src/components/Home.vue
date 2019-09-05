<template>
  <el-container class="home_container">
    <el-header>
      <div class="home_title">Himobi运营平台</div>
      <div class="home_userinfoContainer">
        <el-dropdown @command="handleCommand">
          <span class="el-dropdown-link home_userinfo">
            你好! {{$store.getters.userName}}<i class="el-icon-arrow-down el-icon--right home_userinfo"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item command="logout" divided>退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </el-header>
    <div class="tree">
      <el-tree :data="data" :props="defaultProps" :expand-on-click-node="false" default-expand-all @node-click="select"/>
    </div>
    <div id="el-login-footer">
      <span>版权所有 @ 卓牛科技有限公司</span>
    </div>
  </el-container>
</template>

<script>
import {getRequest} from '../utils/api'
import Treeselect from '@riophae/vue-treeselect'
// import the styles
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
export default {
  mounted: function () {
    this.getData()
  },
  components: {
    Treeselect: Treeselect
  },
  data () {
    return {
      selection: null,
      data: [],
      currentUserName: '',
      value: null,
      options: [ {
        id: 'a',
        label: 'a',
        children: [ {
          id: 'aa',
          label: 'aa'
        }, {
          id: 'ab',
          label: 'ab'
        } ]
      }, {
        id: 'b',
        label: 'b'
      }, {
        id: 'c',
        label: 'c'
      } ]

    }
  },
  methods: {
    handleCommand (command) {
      var _this = this
      if (command === 'logout') {
        this.$confirm('注销登录吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(function () {
          getRequest('/sys/user/admin/loginOut')
          _this.currentUserName = '游客'
          _this.$router.replace({path: '/'})
        }, function () {
          // 取消
        })
      }
    },
    getData () {
      getRequest('/sys/menu/getUserMenu').then(resp => {
        this.data = resp.data
      })
    },
    select () {

    }
  }
}
</script>
<style>
  body{
    margin: 0px;
  }
  .home_container{
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
  }
  .el-header{
    background-color: #5c60ff;
    color: #333;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .home_title{
    color: #fff;
    font-size: 22px;
    display: inline;
  }
  .home_userinfo{
    color: #fff;
    cursor: pointer;
  }
  .tree{
    width: 200px;
    height: 100%;
    border:1px solid #000
  }
</style>
