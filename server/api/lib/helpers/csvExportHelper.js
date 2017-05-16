function removeExcelReservedValues(text) {
  if (typeof (text) === 'string') {
    return text.replace(/;/g, '')
  } else {
    return ''
  }
}

module.exports = {
  removeExcelReservedValues
}
