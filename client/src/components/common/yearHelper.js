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
