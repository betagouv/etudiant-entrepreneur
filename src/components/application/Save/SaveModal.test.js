import expect from 'expect'
import React from 'react'
import {shallow} from 'enzyme'
import SaveModal from './SaveModal'
import {Modal} from 'react-bootstrap'

function setup(contact = { link: ""}) {
  const props = {
    contact,
    errors: {},
    onChange: () => { },
    saveForm: () => { },
    closeSave: () => { },
    isSaveShown: true
  }

  return shallow(<SaveModal {...props} />)
}

describe('<SaveForm>', () => {
  it('renders form and title', () => {
    const wrapper = setup()
    expect(wrapper.find('form').length).toBe(1)
    expect(wrapper.find(Modal.Title).children().text()).toEqual('Sauvegarder mon formulaire')
  })
  it('displays given applicant name', () => {
    const contact = 'Test'
    const wrapper = setup({ name: contact, link: "" })
    expect(wrapper.find('form').length).toBe(1)
    const nameFormControl = wrapper.find('[name="name"]')
    expect(nameFormControl.length).toBe(1)
    expect(nameFormControl.props().value).toEqual(contact)
  })
})
