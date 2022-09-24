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
    <div id="barchartSF" style="width: 95%;height: 750px; margin: 0 auto"></div>
  </div>
</template>

<script>
import * as echarts from 'echarts'

let myChart

export default {
  name: 'SeasonFeature',
  data () {
    return {
      yearValue: '2019',
      cityValue: 'HIALEAH',
      yearOptions: ['2019', '2020', '2021'],
      cityOptions: [],
      monthlyPrec: [],
      monthlyAvgTem: [],
      monthlyEvap: []
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
      this.$ajax.post('/api/complexQuery/precipitationComp/getMonthlyDataListByCity/' + this.yearValue + '/' + this.cityValue.replaceAll('%20', ' ')).then(res1 => {
        if (res1.status === 200) {
          this.monthlyPrec = res1.data
          this.$ajax.post('/api/complexQuery/temperatureComp/getMonthlyDataListByCity/' + this.yearValue + '/' + this.cityValue.replaceAll('%20', ' ')).then(res2 => {
            if (res2.status === 200) {
              this.monthlyAvgTem = res2.data
              this.$ajax.post('/api/complexQuery/evaporation/getMonthlyDataListByCity/' + this.yearValue + '/' + this.cityValue.replaceAll('%20', ' ')).then(res3 => {
                if (res3.status === 200) {
                  this.monthlyEvap = res3.data
                  this.$nextTick(() => {
                    this.setTest()
                  })
                }
              })
            }
          })
        }
      })
    },
    setTest () {
      if (myChart !== null && myChart !== '' && myChart !== undefined) {
        myChart.dispose()
      }
      myChart = echarts.init(document.getElementById('barchartSF'))
      let option = {
        title: {
          text: 'City Weather Feature'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            crossStyle: {
              color: '#999'
            }
          }
        },
        toolbox: {
          show: true,
          feature: {
            magicType: { show: true, type: ['line', 'bar'] },
            restore: { show: true }
          }
        },
        legend: {
          data: ['Evaporation', 'Precipitation', 'Temperature']
        },
        xAxis: [
          {
            type: 'category',
            data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: 'Precipitation',
            min: -4,
            max: 20,
            interval: 4,
            axisLabel: {
              formatter: '{value} ml'
            }
          },
          {
            type: 'value',
            name: 'Temperature',
            min: -20,
            max: 100,
            interval: 20,
            axisLabel: {
              formatter: '{value} °F'
            }
          }
        ],
        series: [
          {
            name: 'Evaporation',
            type: 'bar',
            data: this.monthlyEvap
          },
          {
            name: 'Precipitation',
            type: 'bar',
            data: this.monthlyPrec
          },
          {
            name: 'Temperature',
            type: 'line',
            yAxisIndex: 1,
            data: this.monthlyAvgTem
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
