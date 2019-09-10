<template>
  <div>
    <div>
      <span class="demonstration">开始日期:</span>
      <el-date-picker
        ref="datesRef"
        type="dates"
        v-model="startdate"
        :editable="true"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
        placeholder="选择一个日期">
      </el-date-picker>
      <span class="demonstration">结束日期:</span>
      <el-date-picker
        ref="datesRef"
        type="dates"
        v-model="endDate"
        :editable="true"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
        placeholder="选择一个日期">
      </el-date-picker>
      <span class="demonstration">产品:</span>
      <el-select v-model="form.package_name" placeholder="请选择产品" @change="change" multiple filterable>
        <el-option v-for="item in package_names" :label="item.name" :value="item.id" :key="item.id"></el-option>
      </el-select>
      <span class="demonstration">国家:</span>
      <el-select v-model="form.country" placeholder="请选择国家" @change="change" multiple filterable>
        <el-option v-for="item in countrys" :label="item.name" :value="item.id" :key="item.id"></el-option>
      </el-select>
    </div>
    <div style="margin-top: 5px">
      <el-button type="primary" @click="search">查找</el-button>
      <el-button type="warning" @click="clear">清除</el-button>
      <el-button type="success" @click="exportExcel">导出</el-button>
    </div>
    <div style="margin-top: 5px">
      <el-table id="exportTab"
        ref="multipleTable"
        :data="articles"
        border
        highlight-current-row
        :header-cell-style="{background:'#eef1f6',color:'#606266'}"
        v-loading="loading">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          sortable
          prop="date"
          label="日期"
          align="center">
        </el-table-column>
        <el-table-column
          sortable
          prop="new"
          label="新增用户数"
          align="center">
        </el-table-column>
        <el-table-column
          sortable
          prop="activity"
          label="活跃用户数"
          align="center">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import {getRequest} from '../utils/api'
import FileSaver from 'file-saver'
import XLSX from 'xlsx'
export default {
  name: 'BasicLayout',
  data () {
    return {
      loading: false,
      inputSome: '',
      startdate: '',
      endDate: '',
      form: {
        package_name: '',
        country: ''
      },
      package_names: [{'name': 'com.abc.com', 'id': 1}, {'name': 'com.def.com', 'id': 2}],
      countrys: [{'name': 'US美国', 'id': 'US'}, {'name': 'UK英国', 'id': 'UK'}],
      articles: []
    }
  },
  methods: {
    change: function () {
      console.log(this.form)
    },
    search: function () {
      getRequest('/ad/report').then(resp => {
        this.loading = true
        if (resp.status === 200) {
          this.articles = resp.data.articles
          this.loading = false
        }
      })
    },
    clear: function () {
      this.startdate = ''
      this.endDate = ''
      this.form = {}
      this.package_names = []
      this.countrys = []
    },
    exportExcel () {
      /* generate workbook object from table */
      var xlsxParam = { raw: true } // 导出的内容只做解析，不进行格式转换
      var wb = XLSX.utils.table_to_book(document.querySelector('#exportTab'), xlsxParam)

      /* get binary string as output */
      var wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'array' })
      try {
        FileSaver.saveAs(new Blob([wbout], { type: 'application/octet-stream' }), '审核情况表.xlsx')
      } catch (e) {
        if (typeof console !== 'undefined') {
          console.log(e, wbout)
        }
      }
      return wbout
    }
  }
}
</script>
<style>
</style>
