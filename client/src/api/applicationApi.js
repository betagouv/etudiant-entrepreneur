import axios from 'axios'
// eslint-disable-next-line no-undef
axios.defaults.baseURL = API_URI

class applicationApi {

  static getApplication(id) {
    return axios.get('/application/' + id)
      .then((res) => {
        const applicationResponse = res.data
        return (Object.assign({}, applicationResponse, { id: applicationResponse._id }))
      })
      .catch((err) => {
        throw new Error('La candidature que vous cherchez n\'existe pas')
      })
  }

  static saveApplication(application) {
    return axios.post('/application', application)
      .then((res) => {
        const applicationResponse = res.data
        return (Object.assign({}, applicationResponse, { id: applicationResponse._id }))
      })
  }

  static updateApplication(id, application) {
    return axios.put('/application/' + id, application)
      .then((res) => {
        const applicationResponse = res.data
        return (Object.assign({}, applicationResponse, { id: applicationResponse._id }))
      })
  }

  static sendApplication(id, application) {
    return axios.put('/application/' + id + '/send', application)
      .then((res) => {
        const applicationResponse = res.data
        return (Object.assign({}, applicationResponse, { id: applicationResponse._id }))
      })

  }
}

export default applicationApi
