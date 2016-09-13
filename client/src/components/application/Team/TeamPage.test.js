import expect from 'expect'
import React from 'react'
import {mount} from 'enzyme'
import {TeamPage} from './TeamPage'

const addMembersInputSelector = 'button.add-member'

function initialSetup(newMember = { situation: '' }) {
  const props = {
    project: { teamType: 'collective' },
    newMember,
    team: [],
    actions: {
      updateTeam: () => {},
      updateProject: () => {}
    }
  }
  return mount(<TeamPage {...props} />)
}

function setup(newMember = {}) {
  const mountedPage = initialSetup(newMember)
  mountedPage.find('button.show-component').simulate('click')
  return mountedPage
}

describe('<TeamPage>', () => {
  it('displays a button to Add team members', () => {
    const wrapper = initialSetup()
    const addMemberButton = wrapper.find('button.show-component')
    expect(addMemberButton.length).toBe(1)
  })
  describe('When add member has been clicked', () => {
    it('sets error when leaving empty a required field', () => {
      const wrapper = setup()
      const requiredInput = wrapper.find('.required input[name="firstname"]').first()
      requiredInput.simulate('change', {
        target: {
          name: 'firstname',
          value: ''
        }
      })
      const blockInError = wrapper.find('.has-error')
      expect(blockInError.length).toBe(1)
      expect(blockInError.contains(<div className="help-block">obligatoire</div>)).toBe(true)
    })
    it('does not have any error on first load', () => {
      const wrapper = setup()
      const blockInError = wrapper.find('.has-error')
      expect(blockInError.length).toBe(0)
    })
    it('sets errors when trying to add an invalid new member', () => {
      const wrapper = setup()
      const addMemberButton = wrapper.find('div.panel button')
      addMemberButton.simulate('click')
      const blockInError = wrapper.find('.has-error')
      expect(blockInError.length).toBe(wrapper.find('.required').length - 1)
      expect(blockInError.contains(<div className="help-block">obligatoire</div>)).toBe(true)
    })
    it('allows to add a new team member', () => {
      const newMember = {
        name: 'testName',
        firstname: 'testFirstname',
        role: 'testRole',
        situation: 'testSituation',
        email: 'testmail@test.com'
      }
      const wrapper = setup(newMember)
      const addMemberButton = wrapper.find('div.panel button.add-member')
      addMemberButton.simulate('click')
      expect(
        wrapper.contains(
            <td>{newMember.firstname}</td>
        )
      ).toBe(true)
    })
  })
})
