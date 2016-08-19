import expect from 'expect'
import React from 'react'
import {mount} from 'enzyme'
import SavePage from './SavePage'
import ReactDOM from 'react-dom'

function setup(contact = {}) {
  const props = {
    contact,
  }
  return mount(<SavePage {...props} />)
}

describe('<SavePage>', () => {
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
  it('does not have any error on first load', () => {
    const wrapper = setup()
    const blockInError = wrapper.find('.has-error')
    expect(blockInError.length).toBe(0)
  })
  it('sets errors when trying to save with an invalid contact', () => {
    const wrapper = setup()
    const saveButton = wrapper.find('button.save')
    saveButton.simulate('click')
    const blockInError = wrapper.find('.has-error')
    expect(blockInError.length).toBe(3)
    expect(blockInError.contains(<div className="help-block">obligatoire</div>)).toBe(true)
  })
  it('provide a link when saving with a valid contact', () => {
    const newMember = {
      name: 'testName',
      firstname: 'testFirstname',
      email: 'testMail@test.com'
    }
    const wrapper = setup(newMember)
    const saveButton = wrapper.find('button.save')
    saveButton.simulate('click')
    const linkInput = wrapper.find('input[name="link"]')
    expect(linkInput.prop('value')).toMatch(/etudiant-entrepreneur\.beta\.gouv\.fr/)
  })
})
