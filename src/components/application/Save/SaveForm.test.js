import expect from 'expect'
import React from 'react'
import {shallow} from 'enzyme'
import SaveForm from './SaveForm'
import {Modal} from 'react-bootstrap'

function setup(contact = { link: ""}) {
  const props = {
    contact,
    errors: {},
    onChange: () => { },
    saveForm: () => { },
  }

  return shallow(<SaveForm {...props} />)
}

describe('<SaveForm>', () => {
  it('displays given applicant name', () => {
    const contact = 'Test'
    const wrapper = setup({ name: contact, link: "" })
    expect(wrapper.find('form').length).toBe(1)
    const nameFormControl = wrapper.find('[name="name"]')
    expect(nameFormControl.length).toBe(1)
    expect(nameFormControl.props().value).toEqual(contact)
  })
})
