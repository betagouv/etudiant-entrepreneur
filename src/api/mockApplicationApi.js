import delay from './delay'

let initApplication = {
  id: 'awpzoazryxlwaptduzkgclsh',
  project: {
    id: 10,
    name: "",
    summary: "",
    type: "0",
    step: "",
    site: "",
    blog: "",
    facebook: "",
    twitter: "",
    siret: "",
    activitySummary: "",
    stepSummary: "",
    nextStepSummary: "",
    sector: "0",
    otherSector: "",
    motiviation: "",
    team: []
  }
}

class mockApplicationApi {
  static getApplication(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign({}, initApplication))
      })
    })
  }

  static saveApplication(application) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        initApplication = application
        resolve(Object.assign({}, application))
      }, delay)
    })
  }
}

export default mockApplicationApi
