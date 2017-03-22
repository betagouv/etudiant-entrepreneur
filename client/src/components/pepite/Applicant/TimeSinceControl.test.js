import expect from 'expect'
import React from 'react'
import { shallow } from 'enzyme'
import TimeSinceControl from './TimeSinceControl'

function setup(textDate) {
  return shallow(<TimeSinceControl textDate={textDate} />)
}


describe('<TimeSinceControl>', () => {
  describe('When given an UTC string', () => {
    const currentDateParam = new Date()
    const wrapper = setup(currentDateParam.toUTCString())
    const control = wrapper.find('div')
    it('renders control', () => {
      expect(control.length).toBe(1)
    })
    it('renders a few seconds text', () => {
      expect(control.text()).toBe("a few seconds")
    })
    it('renders a title with the full date', () => {
      expect(control.prop('title')).toContain(currentDateParam.getUTCDate())
      expect(control.prop('title')).toContain(currentDateParam.getUTCFullYear())
    })
  })
})
