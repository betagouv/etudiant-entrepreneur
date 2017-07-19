import axios from 'axios'
import qs from 'qs'
import { getFilename } from './requestUtils'

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

  static getAllApplication(filter, page, userToken) {
    return axios.get(`/application?${qs.stringify({ filter, page }, { encode: false })}`,
      {
        'headers': {
          'Authorization': `Bearer ${userToken}`
        }
      })
      .then((res) => {
        return res.data
      })
      .catch((err) => {
        throw new Error(err)
      })
  }

  static getOtherApplication(id, userToken) {
    return axios.get(`/application/${id}/other`,
      {
        'headers': {
          'Authorization': `Bearer ${userToken}`
        }
      })
      .then((res) => {
        return res.data
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

  static updateCommitteeAnswer(id, committeAnswer, userToken) {
    return axios.put('/committeeAnswer/' + id, committeAnswer,
      {
        'headers': {
          'Authorization': `Bearer ${userToken}`
        }
      })
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

  static getAllPepiteApplications(pepiteId, userToken) {
    return axios.get(`/pepite/${pepiteId}/application`,
      {
        'headers': {
          'Authorization': `Bearer ${userToken}`
        }
      })
      .then((res) => {
        return res.data
      })
      .catch((err) => {
        throw new Error(err)
      })
  }

  static getAllPepiteApplicationsXls(pepiteId, userToken) {
    return axios.get(`/pepite/${pepiteId}/application/xls`,
      {
        'headers': {
          'Authorization': `Bearer ${userToken}`
        }
      })
      .then((res) => {
        return {
          data: res.data,
          type: res.headers['content-type'],
          filename: getFilename(res.headers['content-disposition'])
        }
      })
      .catch((err) => {
        throw new Error(err)
      })
  }
}

export default applicationApi
