import expect from 'expect'
import React from 'react'
import { mount } from 'enzyme'
import { Header } from './Header'
import ReactDOM from 'react-dom'

function setup(user = {}) {
  const props = {
    user,
    actions: {}
  }
  return mount(<Header {...props} />)
}

describe('<Header>', () => {
  it('does not show when user is not logged in', () => {
    const wrapper = setup({ isAuthenticated: false })
    const navbar = wrapper.find('.navbar')
    expect(navbar.length).toBe(0)
  })
  describe('When user is logged in', () => {
    const authenticatedUser = { isAuthenticated: true, username: "authenticated user" }
    const wrapper = setup(authenticatedUser)
    const navbar = wrapper.find('.navbar')
    it('should display Header', () => {
      expect(navbar.length).toBe(1)
    })
    it('should display username', () => {
      const usernameDisplay = navbar.find('#navbar-user')
      expect(usernameDisplay.length).toBe(1)
      expect(usernameDisplay.text()).toBe(authenticatedUser.username)
    })
  })
})
