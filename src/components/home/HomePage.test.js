import React from 'react'
import { mount, shallow } from 'enzyme'
import expect, { spyOn } from 'expect'

import HomePage from './HomePage'

describe('<HomePage/>', () => {
  it('should be mounted once', () => {
    const spy = spyOn(HomePage.prototype, 'componentDidMount')
    const wrapper = mount(<HomePage/>)
    expect(spy.calls.length).toEqual(1)
  })
  it('should have at link to the application form', () => {
    const wrapper = shallow(<HomePage/>)
    expect(wrapper.find('Link').prop('to')).toEqual('application')
  })
})
