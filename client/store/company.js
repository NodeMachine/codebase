import axios from 'axios'

const initialState = {savedUsers: [], customProblems: []}

//ACTIONS:
const ADD_SAVED_USER = 'ADD_SAVED_USER'
const DELETE_SAVED_USER = 'DELETE_SAVED_USER'
const GET_SAVED_USERS = 'GET_SAVED_USER'
const ADD_CUSTOM_PROBLEM = 'ADD_CUSTOM_PROBLEM'
const DELETE_CUSTOM_PROBLEM = 'DELETE_CUSTOM_PROBLEM'
const GET_CUSTOM_PROBLEMS = 'GET_CUSTOM_PROBLEMS'

//ACTION CREATORS:
const addSavedUser = user => {
  return {
    type: ADD_SAVED_USER,
    user: user
  }
}

const deleteSavedUser = userId => {
  return {
    type: DELETE_SAVED_USER,
    userId: userId
  }
}

//THUNK CREATORS:
export const addSavedUserThunk = (companyId, userId) => {
  console.log('addSavedUserThunk callled!')
  return async dispatch => {
    const result = await axios.post(`api/company/${companyId}/${userId}`)
    console.log('addSavedUserThunk result: ', result)
    const user = result.data
    dispatch(addSavedUser(user))
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_SAVED_USER:
      return {...state, savedUsers: [...state.savedUsers].push(action.user)}
    case DELETE_SAVED_USER:
      return {}
    default:
      return state
  }
}
