import expect from 'expect'
import React from 'react'
import {shallow} from 'enzyme'
import RadioGroup from './RadioGroup'

function setup(children = [], name = "", onChange = () => { }, selectedValue = "selectedTestValue") {
  const props = {
    name,
    onChange,
    selectedValue
  }
  return shallow(<RadioGroup {...props} >{children}</RadioGroup>)
}

function getChildren(nbChildren = 0, childrenProps = {}, childrenElt = <div/>) {
  return (
    [...Array(nbChildren)].map((x, i) => {
      return <childrenElt key={i} {...childrenProps} />
    })
  )
}

describe('<RadioGroup>', () => {
  it('assigns the same name property to its children', () => {
    const nameProperty = "test"
    const nbChildren = 3
    const wrapper = setup(getChildren(nbChildren), nameProperty)
    expect(wrapper.find(`[name="${nameProperty}"]`).length).toBe(nbChildren)
  })
  it('assigns the same onChange property to its children', () => {
    const onChangeSpy = expect.createSpy()
    const nbChildren = 3
    const wrapper = setup(getChildren(nbChildren), "", onChangeSpy)
    wrapper.children().forEach((child) =>
      child.props().onChange()
    )
    expect(onChangeSpy.calls.length).toBe(3)
  })
})
