function isValidDate(jsonDate) {
  const date = new Date(jsonDate)
  return (!isNaN(date))
}

module.exports = {
  isValidDate
}
