import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_ALL_PROBLEMS = 'GET_ALL_PROBLEMS'
const GET_SINGLE_PROBLEM = 'GET_SINGLE_PROBLEM'

/**
 * INITIAL STATE
 */
const defaultProblem = {
  allProblems: [],
  singleProblem: {}
}

/**
 * ACTION CREATORS
 */
const getAllProblemsAction = problems => ({type: GET_ALL_PROBLEMS, problems})
const getSingleProblemAction = problem => ({type: GET_SINGLE_PROBLEM, problem})

/**
 * THUNK CREATORS
 */
export const getAllProblems = () => async dispatch => {
  try {
    const {data} = await axios.get('/api/problems')
    dispatch(getAllProblemsAction(data))
  } catch (err) {
    console.error(err)
  }
}

export const getSingleProblem = problemId => async dispatch => {
  try {
    const {data} = await axios.get(`/api/problems/${problemId}`)
    dispatch(getSingleProblemAction(data))
  } catch (err) {
    console.error(err)
  }
}

/**
 * REDUCER
 */
export default function(state = defaultProblem, action) {
  switch (action.type) {
    case GET_ALL_PROBLEMS:
      return {...state, allProblems: [...action.problems]}
    case GET_SINGLE_PROBLEM:
      return {...state, singleProblem: action.problem}
    default:
      return state
  }
}
