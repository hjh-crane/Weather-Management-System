<template>
  <div>
    <div style="width: 95%;height: 50px;margin-bottom: 20px; margin-top: 10px">
      <el-select v-model="yearValue" clearable placeholder='select' style="margin-left: 200px">
        <el-option
          v-for="item in yearOptions"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
      <el-select v-model="cityValue" clearable placeholder='select' style="margin-left: 200px; margin-right: 200px">
        <el-option
          v-for="item in cityOptions"
          :key="item"
          :label="item"
          :value="item">
        </el-option>
      </el-select>
      <el-button type="primary" icon="el-icon-search" @click="getChartData()">Search</el-button>
    </div>
    <div id="barchartMP" style="width: 95%;height: 750px; margin: 0 auto"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'

let myChart

export default {
  name: 'MonthlyPrecipitation',
  data () {
    return {
      yearValue: '2019',
      cityValue: 'GAINESVILLE',
      yearOptions: ['2019', '2020', '2021'],
      cityOptions: [],
      monthlyPrec: []
    }
  },
  created () {
    this.getChartData()
    this.getCityList()
  },
  mounted () {
    this.setTest()
  },
  methods: {
    getCityList () {
      this.$ajax.get('/api/basicData/location/getCityList').then(res => {
        if (res.status === 200) {
          this.cityOptions = res.data
        }
      })
    },
    getChartData () {
      this.$ajax.post('/api/complexQuery/precipitationComp/getMonthlyDataListByCity/' + this.yearValue + '/' + this.cityValue.replaceAll('%20', ' ')).then(res => {
        if (res.status === 200) {
          this.monthlyPrec = res.data
          this.$nextTick(() => {
            this.setTest()
          })
        }
      })
    },
    setTest () {
      if (myChart !== null && myChart !== '' && myChart !== undefined) {
        myChart.dispose()
      }
      myChart = echarts.init(document.getElementById('barchartMP'))
      let option = {
        title: {
          text: 'Monthly Precipitation Statistics'
        },
        tooltip: {
          trigger: 'axis'
        },
        toolbox: {
          show: true,
          feature: {
            magicType: {show: true, type: ['line', 'bar']}
          }
        },
        legend: {},
        xAxis: {
          data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          type: 'category',
          axisPointer: {
            type: 'shadow'
          }
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value} ml'
          }
        },
        series: [
          {
            name: 'precipitation',
            data: this.monthlyPrec,
            type: 'bar', // line
            markLine: {
              data: [{type: 'average', name: 'Avg'}]
            }
          }
        ]
      }
      myChart.setOption(option)
    }
  }
}
</script>

<style scoped>

</style>
