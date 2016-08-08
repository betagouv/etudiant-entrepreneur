import React from 'react'
import { mount, shallow } from 'enzyme'
import expect, { spyOn } from 'expect'

import App from './App'

describe('<App/>', () => {
  it('should have a Header', () => {
    const children = <div/>
    const wrapper = shallow(<App>{children}</App>)
    expect(wrapper.find('Header')).toExist()
  })
})
