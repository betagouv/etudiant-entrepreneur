import expect from 'expect'
import React from 'react'
import {shallow} from 'enzyme'
import CareerForm from './CareerForm'

function setup(career = { bac: {} }) {
  const props = {
    career: Object.assign({}, career),
    onChange: () => { },
    onBacChange: () => { },
    errors: { bac: {} }
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
