<template>
  <div>
    <el-header style="display: flex; align-items: center; width: 100%">
      <span style="margin-left: 50px; width: 80%" @click="returnToFirst()">Weather Recording System</span>
      <div style="width: 20%">
        <el-button type="info" @click="returnToLogin()" style="float: right;margin-right: 50px">Log Out</el-button>
      </div>
    </el-header>
    <el-container style="border-top: 1px solid gainsboro">
      <el-aside width="300px" style="padding-top: 20px">
        <el-col>
          <el-menu default-active="2" @open="handleOpen" @close="handleClose">
            <el-submenu index="1">
              <span slot="title">Basic Data</span>
              <el-menu-item-group>
                <el-menu-item v-model="tabIndex" v-on:click="changeTab11()">Temperature</el-menu-item>
                <el-menu-item v-model="tabIndex" v-on:click="changeTab12()">Precipitation</el-menu-item>
                <el-menu-item v-model="tabIndex" v-on:click="changeTab13()">Wind</el-menu-item>
                <el-menu-item v-model="tabIndex" v-on:click="changeTab14()">Evaporation</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item v-model="tabIndex" v-on:click="changeTab2()">
              <span slot="title">Weather Station</span>
            </el-menu-item>
            <el-menu-item v-model="tabIndex" v-on:click="changeTab3()">
              <span slot="title">Location</span>
            </el-menu-item>
            <el-submenu index="4">
              <span slot="title">Complex Query</span>
              <el-menu-item-group>
                <el-menu-item v-model="tabIndex" v-on:click="changeTab41()">Monthly Temperature</el-menu-item>
                <el-menu-item v-model="tabIndex" v-on:click="changeTab42()">Temperature trend comparison</el-menu-item>
                <el-menu-item v-model="tabIndex" v-on:click="changeTab43()">Monthly precipitation</el-menu-item>
                <el-menu-item v-model="tabIndex" v-on:click="changeTab44()">Precipitation trend comparison
                </el-menu-item>
                <el-menu-item v-model="tabIndex" v-on:click="changeTab45()">Four Seasons Feature</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
          </el-menu>
        </el-col>
      </el-aside>
      <el-main>
        <component :is="tabView"></component>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import Main from '../App'
import SignUp from './SignUp'
import PrecipitationC from './PrecipitationC'
import LocationTable from './LocationTable'
import StationTable from './StationTable'
import TemperatureTable from './TemperatureTable'
import PrecipitationTable from './PrecipitationTable'
import WindTable from './WindTable'
import EvaporationTable from './EvaporationTable'
import MonthlyPrecipitation from './MonthlyPrecipitation'
import MonthlyTemperature from './MonthlyTemperature'
import TemperatureC from './TemperatureC'
import SeasonFeature from './SeasonFeature'

export default {
  name: 'BasicData',
  components: {
    PrecipitationC, SignUp, LocationTable, StationTable, TemperatureTable, PrecipitationTable, WindTable, EvaporationTable, MonthlyPrecipitation, MonthlyTemperature, TemperatureC, SeasonFeature
  },
  data () {
    return {
      email: Main.email,
      usertype: Main.usertype,
      tabIndex: '',
      tabView: 'TemperatureTable'
    }
  },
  methods: {
    returnToLogin () {
      this.$router.push('/')
    },
    returnToFirst () {
      this.tabIndex = '1-1'
      this.tabView = 'TemperatureTable'
    },
    handleOpen (key, keyPath) {
      // console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      // console.log(key, keyPath)
    },
    changeTab11 () {
      this.tabIndex = '1-1'
      this.tabView = 'TemperatureTable'
    },
    changeTab12 () {
      this.tabIndex = '1-2'
      this.tabView = 'PrecipitationTable'
    },
    changeTab13 () {
      this.tabIndex = '1-3'
      this.tabView = 'WindTable'
    },
    changeTab14 () {
      this.tabIndex = '1-4'
      this.tabView = 'EvaporationTable'
    },
    changeTab2 () {
      this.tabIndex = '2'
      this.tabView = 'StationTable'
    },
    changeTab3 () {
      this.tabIndex = '3'
      this.tabView = 'LocationTable'
    },
    changeTab41 () {
      this.tabIndex = '4-1'
      this.tabView = 'MonthlyTemperature'
    },
    changeTab42 () {
      this.tabIndex = '4-2'
      this.tabView = 'TemperatureC'
    },
    changeTab43 () {
      this.tabIndex = '4-3'
      this.tabView = 'MonthlyPrecipitation'
    },
    changeTab44 () {
      this.tabIndex = '4-4'
      this.tabView = 'PrecipitationC'
    },
    changeTab45 () {
      this.tabIndex = '4-5'
      this.tabView = 'SeasonFeature'
    }
  }
}
</script>

<style scoped>

</style>
