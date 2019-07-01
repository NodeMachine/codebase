import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_ALL_PROBLEMS = 'GET_ALL_PROBLEMS'

/**
 * INITIAL STATE
 */
const defaultUser = []

/**
 * ACTION CREATORS
 */
const getAllProblemsAction = problems => ({type: GET_ALL_PROBLEMS, problems})

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

/**
 * REDUCER
 */
export default function(state = defaultUser, action) {
  switch (action.type) {
    case GET_ALL_PROBLEMS:
      return [...action.problems]
    default:
      return state
  }
}
