import axios from 'axios'

export default function configureAxios() {
  // eslint-disable-next-line no-undef
  axios.defaults.baseURL = API_URI
}
