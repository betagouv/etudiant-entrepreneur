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
  it('shows when user is logged in', () => {
    const wrapper = setup({ isAuthenticated: true })
    const navbar = wrapper.find('.navbar')
    expect(navbar.length).toBe(1)
  })
})
