import expect from 'expect'
import React from 'react'
import {shallow} from 'enzyme'
import CareerForm from './CareerForm'

function setup(career = { bac: {}, diploma: {}, tutor: {}, exp: [] }, contact = {}) {
  const props = {
    career: Object.assign({}, career),
    contact: Object.assign({}, contact),
    onChange: () => { },
    onBacChange: () => { },
    onTutorChange: () => { },
    onDiplomaChange: () => { },
    errors: { bac: {}, diploma: {}, tutor: {} }
  }
  return shallow(<CareerForm {...props} />)
}

describe('<CareerForm>', () => {
  it('renders form and title', () => {
    const wrapper = setup()
    expect(wrapper.find('form').length).toBe(1)
    expect(wrapper.find('p').text()).toEqual('Mon Parcours')
  })
})
