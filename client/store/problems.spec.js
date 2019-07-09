/* global describe beforeEach afterEach it */
import {expect} from 'chai'
import {getAllProblems, getSingleProblem, clearSingleProblem} from './problems'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import thunkMiddleware from 'redux-thunk'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('Problem thunk creators', () => {
  let store
  let mockAxios

  const initialState = {allProblems: [], singleProblem: {}}

  beforeEach(() => {
    mockAxios = new MockAdapter(axios)
    store = mockStore(initialState)
  })

  afterEach(() => {
    mockAxios.restore()
    store.clearActions()
  })

  const fakeProblem = {
    id: '567',
    category: 'algorithm',
    defulatCode: 'function increment(num){return asdlkajsdlkajsd}'
  }

  describe('getAllProblems', () => {
    it('eventually dispatches the GET_ALL_PROBLEMS action', async () => {
      mockAxios.onGet('/api/problems').replyOnce(200)
      await store.dispatch(getAllProblems())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_ALL_PROBLEMS')
    })
  })

  describe('getSingleProblem', () => {
    it('eventually dispatches the GET_SINGLE_PROBLEM action', async () => {
      mockAxios.onGet(`/api/problems/${fakeProblem.id}`).replyOnce(200)
      await store.dispatch(getSingleProblem(fakeProblem.id))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GET_SINGLE_PROBLEM')
    })
  })

  describe('clearSingleProblem', () => {
    it('dispatches CLEAR_SINGLE_PROBLEM', async () => {
      await store.dispatch(clearSingleProblem())
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('CLEAR_SINGLE_PROBLEM')
    })
  })
})
