import expect from 'expect'
import React from 'react'
import {shallow} from 'enzyme'
import ProjectForm from './ContactForm'

function setup(contact = {}) {
  const props = {
    contact: Object.assign({
      firstname: '',
      name: '',
      email: '',
      situation: '',
      isRenew: ''
    }, contact),
    onChange: () => { },
    errors: {}
  }
  return shallow(<ProjectForm {...props} />)
}

describe('<ContactForm>', () => {
  it('renders form and title', () => {
    const wrapper = setup({ step: "test" })
    expect(wrapper.find('form').length).toBe(1)
    expect(wrapper.find('p').text()).toEqual('Mes Informations')
  })
  it('displays given contact firstname', () => {
    const firstname = 'Test'
    const wrapper = setup({ firstname })
    expect(wrapper.find('form').length).toBe(1)
    const nameFormControl = wrapper.find('[name="firstname"]')
    expect(nameFormControl.length).toBe(1)
    expect(nameFormControl.props().value).toEqual(firstname)
  })
})
