import moment from 'moment'

const applicationChangeDate = new Date(getCurrentYear(), 5, 15)

export function isBeforeYearStartMonth(year) {
  return moment().isBetween(applicationChangeDate, new Date(year, 9, 1), null, '[)')
}

export function getCurrentYear() {
  const date = new Date()
  const nbDaysBeforeChange = 135
  date.setDate(date.getDate() - nbDaysBeforeChange)
  return date.getFullYear()
}

export function getCurrentUniversityYear() {
  return (getUniversityYear(getCurrentYear()))
}

export function getDescYearList(startYear, nbPreviousYears) {
  const yearList = []
  for (let i = 0; i <= nbPreviousYears; i++) {
    yearList.push(startYear - i)
  }
  return yearList
}

export function getUniversityYear(year) {
  return (`${year}-${year + 1}`)
}


