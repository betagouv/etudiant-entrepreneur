import expect from 'expect'
import React from 'react'
import {shallow} from 'enzyme'
import LoginForm from './LoginForm'

function setup(user = {}) {
  const props = {
    user: Object.assign({
      email: '',
      password: ''
    }, user),
    errors: {},
    onLoginClick: () => { },
    onChange: () => { },
  }
  return shallow(<LoginForm {...props} />)
}

describe('<LoginForm>', () => {
  it('renders form', () => {
    const wrapper = setup()
    expect(wrapper.find('form').length).toBe(1)
  })
  it('renders given email', () => {
    const testEmail = 'testEmail@mail.com'
    const wrapper = setup({email: testEmail})
    expect(wrapper.find('[name="email"]').props().value).toEqual(testEmail)
  })
  it('renders given password', () => {
    const testPassword = 'testPassword'
    const wrapper = setup({password: testPassword})
    expect(wrapper.find('form').length).toBe(1)
    expect(wrapper.find('[name="password"]').props().value).toEqual(testPassword)
  })
})
