import expect from 'expect'
import React from 'react'
import {shallow} from 'enzyme'
import ProfileForm from './ProfileForm'

function setup(profile = {}) {
  const props = {
    profile: Object.assign({}, profile),
    onChange: () => { },
    errors: {}
  }
  return shallow(<ProfileForm {...props} />)
}

describe('<ProfileForm>', () => {
  it('renders form and title', () => {
    const wrapper = setup()
    expect(wrapper.find('form').length).toBe(1)
    expect(wrapper.find('p').text()).toEqual('Mon Profil')
  })
})
