import expect from 'expect'
import React from 'react'
import {mount} from 'enzyme'
import ButtonWrapperComponent from './ButtonWrapperComponent'

function setup(child = {}, showButtonText = "", isChildrenShown = false, glyph = "") {
  const props = {
    showButtonText,
    isChildrenShown,
    glyph
  }
  return mount(<ButtonWrapperComponent {...props} >{child}</ButtonWrapperComponent>)
}

describe('<ButtonWrapperComponent>', () => {
  describe('<ButtonWrapperComponent>', () => {
    const child = <div className="testDiv"/>
    const buttonText = "Test button text"
    const glyph = "plus"
    const sut = setup(child, buttonText, glyph)
    it('Child component is not displayed at start', () => {
      expect(sut.find(child).length).toBe(0)
    })
    it('Button is displayed', () => {
      const proxyButton = sut.find('button.show-component')
      expect(proxyButton.length).toBe(0)
      it('Button contains given text', () => {
        expect(proxyButton.props().value).Contains(buttonText)
      })
      it('Button contains given Glyphicon', () => {
        expect(proxyButton.find(`span.glyphicon-${glyph}`).length).toBe(1)
      })
    })
  })
})
