import expect from 'expect'
import React from 'react'
import {shallow} from 'enzyme'
import ApplicantForm from './ApplicantForm'

function setup(applicant = {}) {
  const props = {
    applicant,
    onChange: () => {}
  }

  return shallow(<ApplicantForm {...props} />)
}

describe('<ApplicantForm>', () => {
  it('renders form and title', () => {
    const wrapper = setup()
    expect(wrapper.find('form').length).toBe(1)
    expect(wrapper.find('p').text()).toEqual('Mes Informations')
  })
  it('displays given applicant name', () => {
    const applicantName = 'Test'
    const wrapper = setup({ name: applicantName })
    expect(wrapper.find('form').length).toBe(1)
    const nameFormControl = wrapper.find('[name="name"]')
    expect(nameFormControl.length).toBe(1)
    expect(nameFormControl.props().value).toEqual(applicantName)
  })
})
