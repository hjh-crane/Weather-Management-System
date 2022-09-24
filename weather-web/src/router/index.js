import Vue from 'vue'
import Router from 'vue-router'
import Login from '../components/Login'
import SignUp from '../components/SignUp'
import BasicData from '../components/BasicData'
import Admin from '../components/Admin'
import PrecipitationC from '../components/PrecipitationC'
import LocationTable from '../components/LocationTable'
import StationTable from '../components/StationTable'
import TemperatureTable from '../components/TemperatureTable'
import PrecipitationTable from '../components/PrecipitationTable'
import WindTable from '../components/WindTable'
import EvaporationTable from '../components/EvaporationTable'
import MonthlyPrecipitation from '../components/MonthlyPrecipitation'
import MonthlyTemperature from '../components/MonthlyTemperature'
import TemperatureC from '../components/TemperatureC'
import SeasonFeature from '../components/SeasonFeature'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/signUp',
      name: 'signUp',
      component: SignUp
    },
    {
      path: '/welcome',
      name: 'BasicData',
      component: BasicData
    },
    {
      path: '/admin',
      name: 'Admin',
      component: Admin
    },
    {
      path: '/precipitationC',
      name: 'PrecipitationC',
      component: PrecipitationC
    },
    {
      path: '/location',
      name: 'LocationTable',
      component: LocationTable
    },
    {
      path: '/station',
      name: 'StationTable',
      component: StationTable
    },
    {
      path: '/temperatureT',
      name: 'TemperatureTable',
      component: TemperatureTable
    },
    {
      path: '/precipitationT',
      name: 'PrecipitationTable',
      component: PrecipitationTable
    },
    {
      path: '/wind',
      name: 'WindTable',
      component: WindTable
    },
    {
      path: '/evaporation',
      name: 'EvaporationTable',
      component: EvaporationTable
    },
    {
      path: '/mPrecipitation',
      name: 'MonthlyPrecipitation',
      component: MonthlyPrecipitation
    },
    {
      path: '/mTemperature',
      name: 'MonthlyTemperature',
      component: MonthlyTemperature
    },
    {
      path: '/temperatureC',
      name: 'TemperatureC',
      component: TemperatureC
    },
    {
      path: '/seasonFeature',
      name: 'SeasonFeature',
      component: SeasonFeature
    }
  ]
})
