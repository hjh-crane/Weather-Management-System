<template>
  <el-container>
    <el-header style="display: flex; align-items: center">
      <span style="margin: 0 auto">Admin</span>
    </el-header>
    <el-container>
      <el-aside width="300px" style="padding-top: 20px">
        <el-col>
          <el-menu
            default-active="2"
            @open="handleOpen"
            @close="handleClose">
            <el-submenu index="1">
              <template slot="title">
                <span>Management</span>
              </template>
              <el-menu-item-group>
                <el-menu-item v-model=tabIndex v-on:click="changeTabtoF()">user data</el-menu-item>
                <el-menu-item v-model=tabIndex v-on:click="changeTabtoS()">user statistics</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-col>
      </el-aside>
      <el-main>
        <el-table :data="userData" height="700px" border style="width: 100%" v-if="tabIndex===1">
          <el-table-column prop="user_id" label="userID" width="180"></el-table-column>
          <el-table-column prop="email" label="email" width="300"></el-table-column>
          <el-table-column prop="password" label="password" width="180"></el-table-column>
          <el-table-column label="operation">
            <template slot-scope="scope">
              <el-button @click="modifyUser(scope.row)" type="text">modify</el-button>
              <el-button @click="deleteUser(scope.row)" type="text" style="color: gray">delete</el-button>
            </template>
          </el-table-column>
        </el-table>
        <div v-if="tabIndex===2">
          <div style="height: 50px; width: 95%;margin-bottom: 20px; margin-top: 10px">
            <el-date-picker
              v-model="value1"
              type="daterange"
              range-separator="To"
              start-placeholder="Start date"
              end-placeholder="End date" value-format="yyyy-MM-dd" format="yyyy-MM-dd"
            style="float: left; margin-right: 30px; margin-left: 50px">
            </el-date-picker>
            <el-button type="primary" icon="el-icon-search" @click="getChartData()" style="float: left">Search</el-button>
          </div>
          <div id="barchartU" style="width: 95%;height: 750px; margin: 0 auto"></div>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import * as echarts from 'echarts'

let myChart

export default {
  name: 'Admin',
  data () {
    return {
      userData: [],
      tabIndex: 1,
      value1: ['2021-11-22', '2021-11-28'],
      dateList: [],
      numOfNewUser: []
    }
  },
  created () {
    this.getUser()
  },
  methods: {
    handleOpen (key, keyPath) {
      // console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      // console.log(key, keyPath)
    },
    changeTabtoF () {
      this.tabIndex = 1
      this.getUser()
    },
    changeTabtoS () {
      this.tabIndex = 2
      this.getChartData()
    },
    getUser () {
      this.$ajax.get('/api/listu').then(res => {
        this.userData = res.data
      }).catch(function (error) {
        console.log(error)
      })
    },
    modifyUser (event) {
      this.$prompt('please enter your email', 'Modify', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
        inputErrorMessage: 'incorrect format'
      }).then(({value}) => {
        // console.log(value)
        // console.log(event.user_id)
        this.$ajax.post('/api/UserManagement/updateEmail/' + event.user_id + '/' + value).then(res => {
          if (res.status === 200) {
            this.getUser()
            this.$message({
              type: 'success',
              message: 'success'
            })
          }
        })
      }).catch(() => {
      })
    },
    deleteUser (event) {
      this.$ajax.post('/api/UserManagement/delete/' + event.user_id).then(res => {
        if (res.status !== 200) {
          this.$message.error('Please try again!')
        } else {
          this.getUser()
        }
      })
    },
    getChartData () {
      this.$ajax.post('/api/UserManagement/getDateList/' + this.value1[0] + '/' + this.value1[1]).then(res1 => {
        if (res1.status === 200) {
          this.dateList = res1.data
          this.$ajax.post('/api/UserManagement/getUserNumList/' + this.value1[0] + '/' + this.value1[1]).then(res2 => {
            if (res2.status === 200) {
              this.numOfNewUser = res2.data
              this.setTest()
            }
          })
        }
      })
    },
    setTest () { // create barchart
      if (myChart !== null && myChart !== '' && myChart !== undefined) {
        myChart.dispose()
      }
      myChart = echarts.init(document.getElementById('barchartU'))
      let option = {
        title: {
          text: 'Statistics of User Added'
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['Number of User']
        },
        xAxis: {
          data: this.dateList,
          type: 'category'
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'Number of User',
            data: this.numOfNewUser,
            type: 'bar'
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
