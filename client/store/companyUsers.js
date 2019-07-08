import axios from 'axios'

const initialState = []

//ACTIONS:
const ADD_SAVED_USER = 'ADD_SAVED_USER'
const DELETE_SAVED_USER = 'DELETE_SAVED_USER'
const GET_SAVED_USERS = 'GET_SAVED_USER'

//ACTION CREATORS:
const gotErrorAction = error => ({type: SET_ERROR, error})
const addSavedUserAction = user => ({type: ADD_SAVED_USER, user: user})
const deleteSavedUserAction = userId => ({
  type: DELETE_SAVED_USER,
  userId: userId
})

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

//ADD USER TO COMPANY SAVED LIST
export const addSavedUserThunk = (companyId, userId) => {
  console.log('addSavedUserThunk called!')
  return async dispatch => {
    const result = await axios.post(`api/companyUsers/${companyId}/${userId}`)
    console.log('addSavedUserThunk result: ', result)
    const user = result.data
    dispatch(addSavedUserAction(user))
  }
}

//ADD USER TO COMPANY SAVED LIST
export const deleteSavedUserThunk = (companyId, userId) => {
  console.log('deleteSavedUserThunk called!')
  return async dispatch => {
    const result = await axios.delete(`api/companyUsers/${companyId}/${userId}`)
    console.log('addSavedUserThunk result: ', result)
    const user = result.data
    dispatch(deleteSavedUserAction(user))
  }
}

//REDUCER:
export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_SAVED_USER:
      return [...state, action.user]
    case DELETE_SAVED_USER:
      return
    default:
      return state
  }
}
