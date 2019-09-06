<template>
  <div>
    <NavMenu />
    <div class="v3-main" :style="{'margin-left': isNavMenuOpen ? '200px': '64px'}">
      <div class="v3-header"> <Header /> </div>
      <div class="v3-tabs"> <TopNav /> </div>
      <el-main class="v3-content-main">
        <keep-alive :include="navTagIndexs">
          <router-view></router-view>
        </keep-alive>
      </el-main>
    </div>
  </div>
</template>

<script>
import {getRequest} from '../utils/api'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
import NavMenu from '@/components/NavMenu'
import { mapGetters, mapState } from 'vuex'
import Header from '@/components/Header'
import TopNav from '@/components/TopNav'
export default {
  mounted: function () {
    this.getData()
  },
  components: {
    NavMenu, Header, TopNav
  },
  data () {
    return {
      selection: null,
      data: [],
      currentUserName: ''
    }
  },
  computed: {
    ...mapGetters(['navTagIndexs']),
    ...mapState(['isNavMenuOpen'])
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
    select (data) {
      console.log(data)
    }
  }
}
</script>
<style>
  body{
    margin: 0px;
    padding: 0px;
  }
  .v3-header {
    height: 40px;
    border-bottom: 1px solid #eee;
    background: #fff
  }
  .v3-main {
    margin-left: 200px;
  }
  .v3-content-main {
    background: #fff;
    margin: 10px;
  }
  .v3-tabs {
    background: #fff
  }
</style>
