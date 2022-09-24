<template>
  <div style="width: 1450px; margin: 0 auto">
    <div style="margin-bottom: 20px">
      <el-select v-model="city" clearable placeholder='select' @change="getStationList()" style="width: 220px">
        <el-option
          v-for="item in cityOptions"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
      <el-input placeholder="search" v-model="input" class="input-with-select" style="width: 500px; float: right">
        <el-button slot="append" icon="el-icon-search" @click="getStationList()"></el-button>
      </el-input>
    </div>
    <div>
      <el-table :data="tableData" height="700px" border style="width: 100%">
        <el-table-column prop="station_id" label="Station ID" width="200px"></el-table-column>
        <el-table-column prop="sname" label="Station Name"></el-table-column>
        <el-table-column prop="latitude" label="Latitude" width="180px"></el-table-column>
        <el-table-column prop="longtitude" label="Longtitude" width="180px"></el-table-column>
        <el-table-column prop="elevation" label="Elevation" width="180px"></el-table-column>
        <el-table-column prop="zipcode" label="Zip code" width="180px"></el-table-column>
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
  name: 'StationTable',
  data () {
    return {
      input: '',
      city: '',
      cityOptions: [],
      tableData: [],
      totalData: [],
      total: 0,
      currentPage: 1,
      size: 20
    }
  },
  created () {
    this.getCityList()
    this.getAllStation()
  },
  methods: {
    getCityList () {
      this.$ajax.get('/api/basicData/location/getCityList').then(res => {
        if (res.status === 200) {
          this.cityOptions = res.data
        }
      })
    },
    handleCurrentChange () {
      this.getTableData()
    },
    getTableData () {
      this.tableData = this.totalData.slice((this.currentPage - 1) * this.size, (this.currentPage) * this.size)
    },
    getAllStation () {
      this.$ajax.get('/api/basicData/station/getAllStations').then(res => {
        if (res.status === 200) {
          this.currentPage = 1
          this.totalData = res.data
          this.total = this.totalData.length
          this.getTableData()
          // console.log(this.total)
        }
      })
    },
    getStationList () {
      // console.log(this.input)
      if (this.city !== '' || this.input.length > 0) {
        let c = this.city
        let i = this.input
        if (c === '') {
          c = 'null'
        } else if (i === '') {
          i = 'null'
        }
        this.$ajax.post('/api/basicData/station/getStationBySearch/' + c + '/' + i).then(res => {
          if (res.status === 200) {
            this.currentPage = 1
            this.totalData = res.data
            this.total = this.totalData.length
            this.getTableData()
            // console.log(res.data)
            // console.log(this.total)
          }
        })
      } else if (this.city === '' && this.input.length === 0) {
        this.getAllStation()
      }
    }
  }
}
</script>

<style scoped>

</style>
