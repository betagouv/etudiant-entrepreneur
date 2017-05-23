import configureAxios from './api/configureAxios'
import Moment from 'moment'

export default function configure() {
  configureAxios()
  setMomentLocale()
}

function setMomentLocale() {
  Moment.locale('fr')
}
