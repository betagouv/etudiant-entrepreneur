import delay from './delay'

let initProject = {
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
  isMobileWebApp: "",
  isPeopleCare: "",
  isSocial: "",
  motiviation: ""
}

class mockProjectApi {
  static getProject(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(Object.assign({}, initProject))
      }, delay)
    })
  }

  static saveProject(project) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        initProject = project
        resolve(Object.assign({}, project))
      }, delay)
    })
  }
}

export default mockProjectApi
