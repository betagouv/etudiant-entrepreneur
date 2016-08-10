import expect from 'expect'
import React from 'react'
import {shallow} from 'enzyme'
import ProjectForm from './ProjectForm'

function setup(project = {}) {
  const props = {
    project: Object.assign({ step: "test" }, project),
    onChange: () => { },
    errors: {}
  }
  return shallow(<ProjectForm {...props} />)
}

describe('<ProjectForm>', () => {
  it('renders form and title', () => {
    const wrapper = setup({ step: "test" })
    expect(wrapper.find('form').length).toBe(1)
    expect(wrapper.find('p').text()).toEqual('Mon Projet')
  })
  it('displays given project name', () => {
    const projectName = 'Test'
    const wrapper = setup({ name: projectName })
    expect(wrapper.find('form').length).toBe(1)
    const nameFormControl = wrapper.find('[name="name"]')
    expect(nameFormControl.length).toBe(1)
    expect(nameFormControl.props().value).toEqual(projectName)
  })
})
