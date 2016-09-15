import delay from './delay'

let initApplication = {
  "id": "awpzoazryxlwaptduzkgclsh",
  "project": {
    "name": "",
    "summary": "",
    "type": "0",
    "step": "",
    "site": "",
    "linkedin": "",
    "blog": "",
    "facebook": "",
    "twitter": "",
    "siret": "",
    "activitySummary": "",
    "stepSummary": "",
    "nextStepSummary": "",
    "sector": "0",
    "otherSector": "",
    "motiviation": "",
    "team": [

    ],
    "teamType": "",
    "status": ""
  },
  "contact": {
    "name": "TestUser",
    "firstname": "testUser",
    "email": "test@test.com",
    "phone": "0624234324",
    "situation": "graduate",
    "isRenew": "true"
  },
  "profile": {
    "gender": "",
    "situation": "",
    "nationality": "",
    "motivation": "",
    "isPartTime": "",
    "hasActivity": "",
    "activity": "",
    "isUnemployed": "",
    "isFreelance": "",
    "birthDate": "",
    "birthPlace": "",
    "ine": "",
    "address": "",
    "cp": "",
    "city": "",
    "country": "",
    "twitter": "",
    "facebook": "",
    "linkedin": "",
    "viadeo": ""
  },
  pepite: {
    region: 0,
    establishment: 0
  },
  "career": {
    "bac": {
      "isOriginal": "",
      "type": "",
      "country": "",
      "year": "",
      "stream": "",
      "establishment": "",
      "city": ""
    },
    "diploma": {
      "year": "",
      "type": "",
      "name": "",
      "sector": "",
      "establishment": "",
      "city": ""
    },
    "tutor": {
      "name": "",
      "firstname": "",
      "email": "",
      "skill": ""
    },
    "entrepreneurship": [

    ]
  }
}

class mockApplicationApi {
  static getApplication(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (id == 'awpzoazryxlwaptduzkgclsh') {
          resolve(Object.assign({}, initApplication))
        } else {
          reject('La candidature que vous cherchez n\'existe pas')
        }
      }, delay)
    })
  }

  static saveApplication(application) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        initApplication = application
        application.id = 'awpzoazryxlwaptduzkgclsh'
        resolve(Object.assign({}, application))
      }, delay)
    })
  }
}

export default mockApplicationApi
