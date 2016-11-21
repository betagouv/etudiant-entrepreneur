import expect from 'expect'
import React from 'react'
import {shallow} from 'enzyme'
import CareerForm from './CareerForm'

function setup(
  career = {
    bac: { type: '', isOriginal: '' },
    diploma: { sector: '' },
    tutor: { askYearOff: '', replaceModule: '', replaceInternship: '' },
    entrepreneurship: []
  },
  contact = {}) {
  const props = {
    career: Object.assign({}, career),
    contact: Object.assign({}, contact),
    onChange: () => { },
    onBacChange: () => { },
    onTutorChange: () => { },
    onDiplomaChange: () => { },
    onEntrepreneurshipChange: () => { },
    tutorErrors: { },
    bacErrors: { },
    diplomaErrors: { }
  }
  return shallow(<CareerForm {...props} />)
}

describe('<CareerForm>', () => {
  it('renders form and title', () => {
    const wrapper = setup()
    expect(wrapper.find('form').length).toBe(1)
  })
})
