export function getFilename(header) {
  const re = /.*filename=['"](.*)['"].*/
  const match = header.match(re)
  if (match && match.length == 2) {
    return match[1]
  } else {
    return null
  }
}
