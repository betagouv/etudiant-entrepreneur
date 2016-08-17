import React from 'react'
import { mount, shallow } from 'enzyme'
import expect, { spyOn } from 'expect'

import HomePage from './HomePage'

describe('<HomePage/>', () => {
  it('should have at link to the application form', () => {
    const wrapper = shallow(<HomePage/>)
    expect(wrapper.find('Link').prop('to')).toEqual('application')
  })
})
