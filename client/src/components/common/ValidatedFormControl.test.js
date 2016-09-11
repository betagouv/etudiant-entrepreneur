import expect from 'expect'
import React from 'react'
import {shallow} from 'enzyme'
import ValidatedFormControl from './ValidatedFormControl'

function setup(props = {}) {
  return shallow(<ValidatedFormControl {...props} />)
}

describe('<ValidatedFormControl>', () => {
  it('pass down all props but error to a <FormControl/>', () => {
    const expectedProps = { test: "toto", testOther: "other"}
    const excludedError = { error: "someError" }
    const props = Object.assign(excludedError, expectedProps)
    const wrapper = setup(props)
    expect(wrapper.find('FormControl').props()).toExclude(excludedError).toInclude(expectedProps)
  })
  it('applies bootstrap error state when given an error', () => {
    const error = "someError"
    const wrapper = setup({ error })
    expect(wrapper.find('div.has-error').length).toBe(1)
  })
  it('does not apply bootstrap error state when not given an error', () => {
    const wrapper = setup()
    expect(wrapper.find('div.has-error').length).toBe(0)
  })
})
