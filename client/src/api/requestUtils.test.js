import expect from 'expect'
import { getFilename } from './requestUtils'


describe('requestUtils', () => {
  describe('getFilename', () => {
    it('should return the fileaname in a Content-Disposition header', () => {
      const filename = 'data.xls'
      const contentDispostionHeader = `attachment; filename="${filename}"`
      expect(getFilename(contentDispostionHeader)).toBe(filename)
    })
    it('should return null otherwise', () => {
      const filename = 'data.xls'
      const badContentDispostionHeader = `attachment; filenamebad="${filename}"`
      expect(getFilename(badContentDispostionHeader)).toBe(null)
    })
  })
})
