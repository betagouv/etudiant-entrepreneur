import expect from 'expect'
import React from 'react'
import {mount} from 'enzyme'
import {ProjectPage} from './ProjectPage'

function setup(project = {}) {
  const props = {
    project,
    actions: { saveProject: () => { } }
  }
  return mount(<ProjectPage {...props} />)
}

describe('<ProjectPage>', () => {
  it('sets error when leaving empty a required field', () => {
    const wrapper = setup()
    const requiredInput = wrapper.find('.required textarea').first()
    requiredInput.simulate('change', {
      target: {
        name: 'summary',
        value: ''
      }
    })
    const blockInError = wrapper.find('.has-error')
    expect(blockInError.length).toBe(1)
    expect(blockInError.contains(<div className="help-block">obligatoire</div>)).toBe(true)
  })
  it('does not set any error when leaving empty a not mandatory field', () => {
    const wrapper = setup()
    const requiredInput = wrapper.find('.required textarea').first()
    requiredInput.simulate('change', {
      target: {
        name: 'title',
        value: ''
      }
    })
    const blockInError = wrapper.find('.has-error')
    expect(blockInError.length).toBe(0)
  })
  it('does not have any error on first load', () => {
    const wrapper = setup()
    const requiredInput = wrapper.find('.required textarea').first()
    const blockInError = wrapper.find('.has-error')
    expect(blockInError.length).toBe(0)
  })
})
