import expect from 'expect'
import React from 'react'
import {shallow} from 'enzyme'
import ProjectForm from './ProjectForm'

function setup() {
  const props = {
    project: {},
    onChange: () => {}
  }

  return shallow(<ProjectForm {...props} />)
}

describe('<ProjectForm>', () => {
  it('renders form and h1', () => {
    const wrapper = setup()
    expect(wrapper.find('form').length).toBe(1)
    expect(wrapper.find('h1').text()).toEqual('Mon Projet')
  })
})
