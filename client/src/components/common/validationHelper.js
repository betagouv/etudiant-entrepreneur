export function isEmptyObject(object) {
  for (let prop in object) {
    if (object.hasOwnProperty(prop)) {
      return false
    }
  }
  return true
}
