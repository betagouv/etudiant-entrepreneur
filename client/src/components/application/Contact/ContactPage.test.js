import expect from 'expect'
import React from 'react'
import {mount} from 'enzyme'
import {ContactPage} from './ContactPage'

function setup(
  contact = {
    situation: '',
    isRenew: ''
  }) {
  const props = {
    contact,
    errors: {},
    actions: { updateContact: () => { } },
    errorsActions: { updateComponentErrors: () => { } }
  }
  return mount(<ContactPage {...props} />)
}

describe('<ContactPage>', () => {
  it('sets error when leaving empty a required field', () => {
    const wrapper = setup()
    const requiredInput = wrapper.find('.required input').first()
    requiredInput.simulate('change', {
      target: {
        name: 'firstname',
        value: ''
      }
    })
    const blockInError = wrapper.find('.has-error')
    expect(blockInError.length).toBe(1)
    expect(blockInError.contains(<div className="help-block">obligatoire</div>)).toBe(true)
  })
  it('does not set any error when a required field is set', () => {
    const wrapper = setup()
    const requiredInput = wrapper.find('.required input').first()
    requiredInput.simulate('change', {
      target: {
        name: 'firstname',
        value: 'someFirstname'
      }
    })
    const blockInError = wrapper.find('.has-error')
    expect(blockInError.length).toBe(0)
  })
  it('does not have any error on first load', () => {
    const wrapper = setup()
    const requiredInput = wrapper.find('.required input').first()
    const blockInError = wrapper.find('.has-error')
    expect(blockInError.length).toBe(0)
  })
})
