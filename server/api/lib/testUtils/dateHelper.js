function isValidDate(jsonDate) {
  const date = new Date(jsonDate)
  return (jsonDate != null && !isNaN(date))
}

module.exports = {
  isValidDate
}
