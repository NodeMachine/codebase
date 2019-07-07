/* global describe beforeEach afterEach it */
import {expect} from 'chai'
import {
  me,
  logout,
  getAllUsers,
  login,
  signup,
  saveSolution,
  updateProfile,
  deleteAccount
} from './user'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('User thunk creators', () => {
  let store
  let mockAxios

  const initialState = {singleUser: {}, allUsers: []}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  const fakeUser = {
    email: 'codymctesterson@email.com',
    password: 'p@ssword!!!$!@#'
  }

  describe('me', () => {
    it('eventually dispatches the GET USER action', async () => {
      mockAxios.onGet('/auth/me').replyOnce(200, fakeUser)
      await store.dispatch(me())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_USER')
      expect(actions[0].singleUser).to.be.deep.equal(fakeUser)
    })
  })

  describe('login', () => {
    it('eventually dispatches the GET USER action', async () => {
      mockAxios.onPut('/api/users/login').replyOnce(200, fakeUser)
      await store.dispatch(login(fakeUser.email, fakeUser.password))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_USER')
      expect(actions[0].singleUser).to.be.deep.equal(fakeUser)
    })
  })

  describe('signup', () => {
    it('creates a new user and signs them in', async () => {
      fakeUser.firstName = 'Cody'
      fakeUser.lastName = 'McTesterson'
      mockAxios.onPost('/api/users/signup').replyOnce(200, fakeUser)
      await store.dispatch(
        signup(
          fakeUser.firstName,
          fakeUser.lastName,
          fakeUser.email,
          fakeUser.password
        )
      )
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_USER')
      expect(actions[0].singleUser).to.be.deep.equal(fakeUser)
    })
  })

  describe('updateProfile', () => {
    it('updates users profile and changes state', async () => {
      mockAxios
        .onPost('/api/users/update/2pxqTVM3iGh066CHJ0tB')
        .replyOnce(200, {update: {lastName: 'Blobberson'}})
      mockAxios
        .onGet('/api/users/2pxqTVM3iGh066CHJ0tB')
        .replyOnce(200, {...fakeUser, lastName: 'Blobberson'})
      await store.dispatch(
        updateProfile('2pxqTVM3iGh066CHJ0tB', {lastName: 'Blobberson'})
      )
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_USER')
      expect(actions[0].singleUser.lastName).to.be.equal('Blobberson')
    })
  })

  describe('getAllUsers', () => {
    it('getAllUsers: eventually dispatches the GET_USERS action', async () => {
      mockAxios.onGet('/api/users').replyOnce(204, [
        {
          firstName: 'Testerson',
          lastName: 'MockDonald',
          email: 'testeroo@email.com'
        }
      ])
      await store.dispatch(getAllUsers())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_USERS')
    })
  })

  describe('saveSolution', () => {
    it('saveSolution: eventually dispatches the GET_USERS action', async () => {
      const problem = {name: '99 Problems', prompt: 'I feel bad for you son'}
      mockAxios.onPost('/api/users/save/2pxqTVM3iGh066CHJ0tB').replyOnce(204, {
        firstName: 'Testerson',
        lastName: 'MockDonald',
        email: 'testeroo@email.com',
        problems: [problem]
      })
      await store.dispatch(
        saveSolution(problem, '2pxqTVM3iGh066CHJ0tB', true, 'console.log()')
      )
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_USER')
      expect(actions[0].singleUser.problems[0].name).to.be.equal(problem.name)
    })
  })

  describe('logout', () => {
    it('logout: eventually dispatches the REMOVE_USER action', async () => {
      mockAxios.onPost('/api/users/logout').replyOnce(204)
      mockAxios.onGet('/api/users').replyOnce(204)
      await store.dispatch(logout())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('REMOVE_USER')
    })
  })

  describe('deleteAccount', () => {
    it('deleteAccount: eventually dispatches the REMOVE_USER action', async () => {
      mockAxios.onDelete('/api/users/2pxqTVM3iGh066CHJ0tB').replyOnce(204)
      await store.dispatch(deleteAccount('2pxqTVM3iGh066CHJ0tB'))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('REMOVE_USER')
    })
  })
})
