import expect from 'expect'
import React from 'react'
import {mount} from 'enzyme'
import SavePage from './SavePage'
import ReactDOM from 'react-dom'

function setup(link = '') {
  const props = {
    link,
  }
  return mount(<SavePage {...props} />)
}

describe('<SavePage>', () => {
  it('does not have any error on first load', () => {
    const wrapper = setup()
    const blockInError = wrapper.find('.has-error')
    expect(blockInError.length).toBe(0)
  })
  it('provide a link when saving with a valid contact', () => {
    const wrapper = setup()
    const saveButton = wrapper.find('button.save')
    saveButton.simulate('click')
    const linkInput = wrapper.find('input[name="link"]')
    expect(linkInput.prop('value')).toMatch(/etudiant-entrepreneur\.beta\.gouv\.fr/)
  })
})
