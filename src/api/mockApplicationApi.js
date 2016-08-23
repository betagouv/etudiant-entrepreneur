import delay from './delay'

const application = {
  id: 'awpzoazryxlwaptduzkgclsh'
}

class mockApplicationApi {
  static getApplication(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign({}, application))
      })
    })
  }
}

export default mockApplicationApi
