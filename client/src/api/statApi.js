import axios from 'axios'

class statApi {
  static getApplicationSummary() {
    return axios.get('/stat/applicationSummary')
      .then((response) => {
        return response.data
      })
  }
  static getApplicationGenderSummary() {
    return axios.get('/stat/applicationGenderSummary')
      .then((response) => {
        return response.data
      })
  }
  static getApplicationStudentSummary() {
    return axios.get('/stat/applicationStudentSummary')
      .then((response) => {
        return response.data
      })
  }
  static getApplicationDiplomaSummary() {
    return axios.get('/stat/applicationDiplomaSummary')
      .then((response) => {
        return response.data
      })
  }
}

export default statApi
