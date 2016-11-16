import expect from 'expect'
import React from 'react'
import { mount } from 'enzyme'
import { LoginPage } from './LoginPage'

function setup() {
  const props = {
    actions: {}
  }
  return mount(<LoginPage {...props} />)
}

describe('<LoginPage>', () => {
  it('does not have any error on first load', () => {
    const wrapper = setup()
    const blockInError = wrapper.find('.has-error')
    expect(blockInError.length).toBe(0)
  })

  describe('Password Field', () => {
    it('set in error when left empty', () => {
      const wrapper = setup()
      const passwordInput = wrapper.find('input[name="password"]')
      passwordInput.simulate('change', {
        target: {
          name: 'password',
          value: ''
        }
      })
      const blockInError = wrapper.find('.has-error')
      expect(blockInError.length).toBe(1)
      expect(blockInError.contains(<div className="help-block">obligatoire</div>)).toBe(true)
    })
    it('does not have any error after one caracter', () => {
      const wrapper = setup()
      const passwordInput = wrapper.find('input[name="password"]')
      passwordInput.simulate('change', {
        target: {
          name: 'password',
          value: 'c'
        }
      })
      const blockInError = wrapper.find('.has-error')
      expect(blockInError.length).toBe(0)
    })
    it('does not show inputed information', () => {
      const wrapper = setup()
      const inputedPassword = 'secret'
      const passwordInput = wrapper.find('input[name="password"]')
      passwordInput.simulate('change', {
        target: {
          name: 'password',
          value: inputedPassword
        }
      })
      expect(passwordInput.text()).toNotEqual(inputedPassword)
    })
  })

  describe('Email Field', () => {
    it('set in error when left empty', () => {
      const wrapper = setup()
      const emailInput = wrapper.find('input[name="email"]')
      emailInput.simulate('change', {
        target: {
          name: 'email',
          value: ''
        }
      })
      const blockInError = wrapper.find('.has-error')
      expect(blockInError.length).toBe(1)
      expect(blockInError.contains(<div className="help-block">Tu dois renseigner une adresse email valide</div>)).toBe(true)
    })
    it('set in error when email is invalid', () => {
      const wrapper = setup()
      const emailInput = wrapper.find('input[name="email"]')
      emailInput.simulate('change', {
        target: {
          name: 'email',
          value: 'invalidmailmail.com'
        }
      })
      const blockInError = wrapper.find('.has-error')
      expect(blockInError.length).toBe(1)
      expect(blockInError.contains(<div className="help-block">Tu dois renseigner une adresse email valide</div>)).toBe(true)
    })
    it('does not have any error when it\'s a valid email', () => {
      const wrapper = setup()
      const emailInput = wrapper.find('input[name="email"]')
      emailInput.simulate('change', {
        target: {
          name: 'email',
          value: 'validmail@mail.com'
        }
      })
      const blockInError = wrapper.find('.has-error')
      expect(blockInError.length).toBe(0)
    })
    it('does not show inputed information', () => {
      const wrapper = setup()
      const inputedEmail = 'secret'
      const emailInput = wrapper.find('input[name="email"]')
      emailInput.simulate('change', {
        target: {
          name: 'email',
          value: inputedEmail
        }
      })
      expect(emailInput.text()).toNotEqual(inputedEmail)
    })
  })

})
