import expect from 'expect'
import React from 'react'
import {shallow} from 'enzyme'
import SaveForm from './SaveForm'
import {Modal} from 'react-bootstrap'

function setup(link = '') {
  const props = {
    link,
    errors: {},
    onChange: () => { },
    saveForm: () => { },
  }

  return shallow(<SaveForm {...props} />)
}

describe('<SaveForm>', () => {
  it('displays a link to the application', () => {
    const link = 'testlink'
    const wrapper = setup(link)
    expect(wrapper.find('form').length).toBe(1)
    const nameFormControl = wrapper.find('[name="link"]')
    expect(nameFormControl.length).toBe(1)
    expect(nameFormControl.props().value).toEqual(link)
  })
})
