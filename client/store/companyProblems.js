import axios from 'axios'

const initialState = {customProblems: []}

// ACTIONS
const ADD_CUSTOM_PROBLEM = 'ADD_CUSTOM_PROBLEM'
const DELETE_CUSTOM_PROBLEM = 'DELETE_CUSTOM_PROBLEM'
const GET_CUSTOM_PROBLEMS = 'GET_CUSTOM_PROBLEMS'

// ACTION CREATORS
const getCustomProblems = problems => ({
  type: GET_CUSTOM_PROBLEMS,
  customProblems: problems
})

export const getAllCustomProblems = companyId => {
  return async dispatch => {
    try {
      const problems = await axios.get(
        `/api/company/${companyId}/customproblem`
      )
      dispatch(getCustomProblems(problems.data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const addCustomProblem = (companyId, problem) => {
  return async dispatch => {
    try {
      await axios.post(`/api/company/${companyId}/customproblem`, {problem})
      dispatch(getAllCustomProblems(companyId))
    } catch (error) {
      console.log(error)
    }
  }
}

export const removeCustomProblem = (companyId, problemId) => {
  return async dispatch => {
    try {
      await axios.delete(`/api/company/${companyId}/${problemId}`)
      dispatch(getAllCustomProblems(companyId))
    } catch (error) {
      console.log(error)
    }
  }
}

export const updateCustomProblem = (companyId, problemId, update) => {
  return async dispatch => {
    try {
      await axios.put(`/api/company/${companyId}/${problemId}`, {update})
      dispatch(getAllCustomProblems(companyId))
    } catch (error) {
      console.log(error)
    }
  }
}

export const saveSolutionToCustomProblem = (
  companyId,
  problemId,
  userId,
  name,
  solution,
  isSolved
) => {
  return async dispatch => {
    try {
      await axios.put(`/api/company/${companyId}/${problemId}`, {
        userId,
        name,
        solution,
        isSolved
      })
      dispatch(getAllCustomProblems(companyId))
    } catch (error) {
      console.log(error)
    }
  }
}

//REDUCER:
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_CUSTOM_PROBLEMS:
      return action.problems
    default:
      return state
  }
}
