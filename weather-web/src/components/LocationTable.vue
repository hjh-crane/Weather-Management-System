<template>
  <div style="width: 1450px; margin: 0 auto">
    <div style="margin-bottom: 20px; width: 500px; float: right">
      <el-input placeholder="search" v-model="input" class="input-with-select">
        <el-button slot="append" icon="el-icon-search" @click="getLocationList()"></el-button>
      </el-input>
    </div>
    <div>
      <el-table :data="tableData" height="700px" border style="width: 100%">
        <el-table-column prop="zip" label="Zip code" width="200px"></el-table-column>
        <el-table-column prop="city" label="City Name"></el-table-column>
        <el-table-column prop="county" label="County" width="300px"></el-table-column>
        <el-table-column prop="state" label="State" width="300px"></el-table-column>
      </el-table>
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage"
        :page-size=size
        layout="total, prev, pager, next"
        :total=total
        style="float: right">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LocationTable',
  data () {
    return {
      input: '',
      tableData: [],
      totalData: [],
      total: 0,
      currentPage: 1,
      size: 20
    }
  },
  created () {
    this.getAllLocation()
  },
  methods: {
    handleCurrentChange () {
      this.getTableData()
    },
    getTableData () {
      this.tableData = this.totalData.slice((this.currentPage - 1) * this.size, (this.currentPage) * this.size)
    },
    getAllLocation () {
      this.$ajax.get('/api/basicData/location/getListOfAll').then(res => {
        if (res.status === 200) {
          this.currentPage = 1
          this.totalData = res.data
          this.total = this.totalData.length
          this.getTableData()
          // console.log(this.total)
        }
      })
    },
    getLocationList () {
      // console.log(this.input)
      if (this.input.length > 0) {
        this.$ajax.post('/api/basicData/location/getListBySearch/' + this.input).then(res => {
          if (res.status === 200) {
            this.currentPage = 1
            this.totalData = res.data
            this.total = this.totalData.length
            this.getTableData()
            // console.log(res.data)
            // console.log(this.total)
          }
        })
      } else {
        this.getAllLocation()
      }
    }
  }
}
</script>

<style scoped>

</style>
