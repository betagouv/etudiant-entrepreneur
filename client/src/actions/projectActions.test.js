import expect from 'expect'
import * as projectActions from './projectActions'
import * as types from './actionTypes'

import thunk from 'redux-thunk'
import configureMockStore from 'redux-mock-store'

describe('Project Actions', () => {
  describe('loadProjectSuccess', () => {
    it('should create a LOAD_PROJECT_SUCCESS action', () => {
      const project = { someProject: 'test' }
      const expectedAction = {
        type: types.LOAD_PROJECT_SUCCESS,
        project: project
      }

      const action = projectActions.loadProjectSuccess(project)

      expect(action).toEqual(expectedAction)
    })
  })

  describe('updateProjectSuccess', () => {
    it('should create a UPDATE_PROJET action', () => {
      const project = { someProject: 'test' }
      const expectedAction = {
        type: types.UPDATE_PROJECT,
        project: project
      }

      const action = projectActions.updateProject(project)

      expect(action).toEqual(expectedAction)
    })

    const middleware = [thunk]
    const mockStore = configureMockStore(middleware)

    describe('Async Actions', () => {
      describe('updateTeam', () => {
        it('should create an UPDATE_PROJET action', () => {
          const Initialproject = {
            Id: 'test',
            team: ['someTeamMember']
          }
          const team = ['someTeamMember', 'OtherTeamMember']
          const expectedActions = [
            { type: types.UPDATE_PROJECT, project: Initialproject }
          ]
          const store = mockStore({ application: {}, project: {} })
          store.dispatch(projectActions.updateTeam(team))
          const actions = store.getActions()
          expect(actions[0].type).toEqual(types.UPDATE_PROJECT)
          expect(actions[0].project.team).toEqual(team)
        })
      })
    })
  })
})
