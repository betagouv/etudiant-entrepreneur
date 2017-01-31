import expect from 'expect'
import React from 'react'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import ProfilePage from './ProfilePage'
import configureStore from '../../../store/configureStore'
import thunk from 'redux-thunk'

function setup() {
  const store = configureStore()
  return mount(
    <Provider store={store}>
      <ProfilePage />
    </Provider>)
}

describe('Integration::<ProfilePage>', () => {
  let wrapper = null

  beforeEach((done) => {
    wrapper = setup()
    done()
  })

  it('does not have any error on first load', () => {
    const blockInError = wrapper.find('.has-error')
    expect(blockInError.length).toBe(0)
  })
  describe('input birthDate', () => {
    const inputName = 'birthDate'
    const inputCSSSelector = `.required input[name="${inputName}"]`
    it('sets error when inputting a unexisting date field', () => {
      const wrapper = setup()
      const requiredInput = wrapper.find(inputCSSSelector).first()
      requiredInput.simulate('change', {
        target: {
          name: inputName,
          value: '30022020'
        }
      })
      const blockInError = wrapper.find('.has-error')
      expect(blockInError.length).toBe(1)
    })
    it('does not set any error when a required field is set', () => {
      const wrapper = setup()
      const requiredInput = wrapper.find(inputCSSSelector).first()
      requiredInput.simulate('change', {
        target: {
          name: 'birthDate',
          value: '20022000'
        }
      })
      const blockInError = wrapper.find('.has-error')
      expect(blockInError.length).toBe(0)
    })
    it('sets error when inputting a date later than 10 years ago', () => {
      const wrapper = setup()
      const requiredInput = wrapper.find(inputCSSSelector).first()
      requiredInput.simulate('change', {
        target: {
          name: 'birthDate',
          value: '2002' + (new Date().getFullYear() - 9)
        }
      })
      const blockInError = wrapper.find('.has-error')
      expect(blockInError.length).toBe(1)
    })
  })
})
