import React from 'react'
import { mount, shallow } from 'enzyme'
import expect, { spyOn } from 'expect'

import App from './App'

describe('<App/>', () => {
  it('should be mounted once', () => {
    const spy = spyOn(App.prototype, 'componentDidMount')
    const wrapper = mount(<App/>)
    expect(spy.calls.length).toEqual(1)
  })
  it('should have a Header', () => {
    const wrapper = shallow(<App/>)
    expect(wrapper.find('Header')).toExist()
  })
})
