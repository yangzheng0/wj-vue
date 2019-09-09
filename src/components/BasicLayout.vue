<template>
  <div>
    <div>
      <span class="demonstration">开始日期:</span>
      <el-date-picker
        ref="datesRef"
        type="dates"
        v-model="startdate"
        :editable="false"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
        placeholder="选择一个日期">
      </el-date-picker>
      <span class="demonstration">结束日期:</span>
      <el-date-picker
        ref="datesRef"
        type="dates"
        v-model="endDate"
        :editable="false"
        format="yyyy-MM-dd"
        value-format="yyyy-MM-dd"
        placeholder="选择一个日期">
      </el-date-picker>
      <span class="demonstration">产品:</span>
      <el-select v-model="form.package_name" placeholder="请选择" @change="change">
        <el-option v-for="item in package_names" :label="item.name" :value="item.id" :key="item.id"></el-option>
      </el-select>
      <span class="demonstration">国家:</span>
      <el-select v-model="form.country" placeholder="请选择" @change="change">
        <el-option v-for="item in countrys" :label="item.name" :value="item.id" :key="item.id"></el-option>
      </el-select>
    </div>
    <div>
      <el-button type="primary" @click="search">查找</el-button>
    </div>
    <div>
      <el-table></el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BasicLayout',
  data () {
    return {
      inputSome: '',
      startdate: '',
      endDate: '',
      form: {
        package_name: '',
        country: ''
      },
      package_names: [{'name': 'com.abc.com', 'id': 1}],
      countrys: [{'name': 'US美国', 'id': 'US'}]
    }
  },
  methods: {
    change: function () {
      console.log(this.form)
    },
    search: function () {

    }
  }
}
</script>
