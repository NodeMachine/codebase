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
const gotError = error => ({type: SET_ERROR, error})
const addSavedUser = user => ({type: ADD_SAVED_USER, user: user})
const deleteSavedUser = userId => ({type: DELETE_SAVED_USER, userId: userId})

//COMPANY LOGIN THUNK:
export const companyLogin = (email, password) => {
  return async dispatch => {
    try {
      const result = await axios.put('api/company/login', {email, password})
      console.log('result company login: ', result.data)
    } catch (error) {
      console.log('error loggin company in!')
    }
  }
}

//COMPANY SIGNUP THUNK:
export const companySignup = (
  companyName,
  companyInfo,
  companyIndustry,
  email,
  password
) => {
  console.log('company signup thunk called: ', companyName)
  return async dispatch => {
    try {
      const result = await axios.post('/api/company/signup', {
        companyName,
        companyInfo,
        companyIndustry,
        email,
        password
      })
      console.log('result data in company signup thunk: ', result.data)
    } catch (error) {
      // dispatch(gotError(error.response.data));
      console.log('Error in company signup thunk: ', error.message)
    }
  }
}

export const addSavedUserThunk = (companyId, userId) => {
  console.log('addSavedUserThunk called!')
  return async dispatch => {
    const result = await axios.post(`api/company/${companyId}/${userId}`)
    console.log('addSavedUserThunk result: ', result)
    const user = result.data
    dispatch(addSavedUser(user))
  }
}

//REDUCER:
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
