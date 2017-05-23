function isValidDate(jsonDate) {
  const date = new Date(jsonDate)
  return (jsonDate != null && !isNaN(date))
}

function yesterday() {
  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)
  return yesterday
}

module.exports = {
  isValidDate,
  yesterday
}
