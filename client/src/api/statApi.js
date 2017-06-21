import axios from 'axios'

class statApi {
  static getApplicationSummary() {
    return axios.get('/stat/applicationSummary')
      .then((response) => {
        return response.data
      })
  }
}

export default statApi
