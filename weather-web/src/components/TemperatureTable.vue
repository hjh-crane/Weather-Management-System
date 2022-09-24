<template>
  <div style="width: 1450px; margin: 0 auto">
    <div style="margin-bottom: 20px">
      <el-date-picker
        v-model="dateValue"
        type="daterange"
        range-separator="To"
        start-placeholder="Start date"
        end-placeholder="End date" value-format="yyyy-MM-dd" format="yyyy-MM-dd"
        style="float:left;">
      </el-date-picker>
      <el-select v-model="city" clearable placeholder='select' @change="getStationList()" style="margin-right: 150px;width: 220px">
        <el-option
          v-for="item in cityOptions"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
      <el-select v-model="station" clearable placeholder='select'>
        <el-option
          v-for="item in stationOptions"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
      <el-button type="primary" icon="el-icon-search" @click="getTemperatureList()" style="float: right">Search</el-button>
    </div>
    <div>
      <el-table :data="tableData" height="700px" border style="width: 100%">
        <el-table-column prop="station_id" label="Station_ID"></el-table-column>
        <el-table-column prop="data_time" label="Data_Time" :formatter="dateFormat" width="300px"></el-table-column>
        <el-table-column prop="tavg" label="average Temperature" width="200px"></el-table-column>
        <el-table-column prop="tmax" label="max Temperature" width="200px"></el-table-column>
        <el-table-column prop="tmin" label="min Temperature" width="200px"></el-table-column>
        <el-table-column prop="tobs" label="observe Temperature" width="200px"></el-table-column>
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
  name: 'TemperatureTable',
  data () {
    return {
      dateValue: ['2019-04-01', '2019-04-30'],
      city: 'GAINESVILLE',
      cityOptions: [],
      station: '',
      stationOptions: [],
      tableData: [],
      totalData: [],
      total: 0,
      currentPage: 1,
      size: 20
    }
  },
  created () {
    this.getCityList()
    this.getStationList()
    this.getTemperatureList()
  },
  methods: {
    dateFormat (row, column, cellValue, index) {
      const daterc = row[column.property]
      if (daterc != null) {
        const dateMat = new Date(daterc)
        const year = dateMat.getFullYear()
        const month = dateMat.getMonth() + 1
        const day = dateMat.getDate()
        const timeFormat = year + '-' + month + '-' + day
        return timeFormat
      }
    },
    getCityList () {
      this.$ajax.get('/api/basicData/location/getCityList').then(res => {
        if (res.status === 200) {
          this.cityOptions = res.data
        }
      })
    },
    getStationList () {
      this.station = ''
      let c = this.city
      if (c === '') {
        c = 'null'
      }
      this.$ajax.post('/api/basicData/station/getIDListByCity/' + c).then(res => {
        if (res.status === 200) {
          this.stationOptions = res.data
        }
      })
    },
    handleCurrentChange () {
      this.getTableData()
    },
    getTableData () {
      this.tableData = this.totalData.slice((this.currentPage - 1) * this.size, (this.currentPage) * this.size)
    },
    getTemperatureList () {
      // console.log(this.dateValue)
      if (this.dateValue === null) {
        this.$message.error('please pick date range')
      } else if (this.city === '') { // only have date range
        this.$ajax.post('/api/basicData/temperature/getListByDate/' + this.dateValue[0] + '/' + this.dateValue[1]).then(res => {
          if (res.status === 200) {
            this.currentPage = 1
            this.totalData = res.data
            this.total = this.totalData.length
            this.getTableData()
          }
        })
      } else if (this.city !== '' && this.station === '') {
        this.$ajax.post('/api/basicData/temperature/getListByCityDate/' + this.city + '/' + this.dateValue[0] + '/' + this.dateValue[1]).then(res => {
          if (res.status === 200) {
            this.currentPage = 1
            this.totalData = res.data
            this.total = this.totalData.length
            this.getTableData()
          }
        })
      } else if (this.city !== '' && this.station !== '') {
        this.$ajax.post('/api/basicData/temperature/getListByStationDate/' + this.station + '/' + this.dateValue[0] + '/' + this.dateValue[1]).then(res => {
          if (res.status === 200) {
            this.currentPage = 1
            this.totalData = res.data
            this.total = this.totalData.length
            this.getTableData()
          }
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
