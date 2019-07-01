import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER = 'GET_USER'
const REMOVE_USER = 'REMOVE_USER'
const GET_USERS = 'GET_USERS'

/**
 * INITIAL STATE
 */
const initialState = {
  allUsers: [],
  singleUser: {}
}

/**
 * ACTION CREATORS
 */
const getUser = singleUser => ({type: GET_USER, singleUser})
const removeUser = () => ({type: REMOVE_USER})
const gotAllUsers = allUsers => ({type: GET_USERS, allUsers})

/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  try {
    const res = await axios.get('/auth/me')
    dispatch(getUser(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const login = (email, password) => async dispatch => {
  try {
    const res = await axios.put('/api/users/login', {email, password})
    dispatch(getUser(res.data))
  } catch (error) {
    console.log(error)
  }
}

export const signup = (
  firstName,
  lastName,
  email,
  password
) => async dispatch => {
  try {
    const res = await axios.post('/api/users/signup', {
      firstName,
      lastName,
      email,
      password
    })
    dispatch(getUser(res.data))
  } catch (error) {
    console.log(error)
  }
}

export const updateProfile = (id, obj) => async dispatch => {
  try {
    await axios.post(`/api/users/update/${id}`, {update: obj})
    const res = axios.get(`/api/users/${id}`)
    dispatch(getUser(res.data))
  } catch (error) {
    console.log(error)
  }
}

export const getAllUsers = () => async dispatch => {
  try {
    const res = await axios.get('/api/users')
    dispatch(gotAllUsers(res.data))
  } catch (error) {
    console.log(error)
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/api/users/logout')
    dispatch(removeUser())
    dispatch(getAllUsers())
  } catch (err) {
    console.error(err)
  }
}

export const deleteAccount = id => async dispatch => {
  try {
    await axios.delete(`/api/users/${id}`)
    dispatch(removeUser())
  } catch (error) {
    console.log(error)
  }
}

/**
 * REDUCER
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return {...state, singleUser: action.user}
    case REMOVE_USER:
      return {...state, singleUser: {}}
    case GET_USERS:
      return {...state, allUsers: action.allUsers}
    default:
      return state
  }
}
