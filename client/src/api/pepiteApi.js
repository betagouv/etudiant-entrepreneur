import axios from 'axios'

class pepiteApi {
  static getRegions() {
    return axios.get('/region/')
      .then((res) => {
        return res.data
      })
  }

  static getEstablishments(regionId) {
    return axios.get(`/region/${regionId}/establishment`)
      .then((res) => {
        return res.data
      })
  }

  static getPepites(regionId) {
    return axios.get(`/region/${regionId}/pepite`)
      .then((res) => {
        return res.data
      })
  }

  static getPepite(pepiteId) {
    return axios.get(`/pepite/${pepiteId}`)
      .then((res) => {
        return res.data
      })
  }

  static getAllPepites() {
    return axios.get(`/pepite`)
      .then((res) => {
        return res.data
      })
  }
}

export default pepiteApi
