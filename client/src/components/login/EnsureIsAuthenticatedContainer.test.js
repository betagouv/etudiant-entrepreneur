import expect from 'expect'
import React from 'react'
import { shallow } from 'enzyme'
import { EnsureIsAuthenticatedContainer } from './EnsureIsAuthenticatedContainer'

function setup(isUserAuthenticated = false, currentURL = '', children = {}) {
  const props = {
    isUserAuthenticated,
    currentURL
  }
  return shallow(<EnsureIsAuthenticatedContainer {...props}>{children}</EnsureIsAuthenticatedContainer>)
}

describe('<EnsureIsAuthenticatedContainer>', () => {
  const childClass = 'testDiv'
  const child = <div className={childClass} />
  describe('When user is authenticated', () => {
    const isUserAuthenticated = true
    it('renders children', () => {
      const wrapper = setup(isUserAuthenticated, '', child)
      expect(wrapper.find(`.${childClass}`).length).toBe(1)
    })
  })
  describe('When user is not authenticated', () => {
    const isUserAuthenticated = false
    it('does not children', () => {
      const wrapper = setup(isUserAuthenticated, '', child)
      expect(wrapper.find(`.${childClass}`).length).toBe(0)
    })
  })
})
