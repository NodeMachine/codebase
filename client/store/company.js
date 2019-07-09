import axios from 'axios'

const initialState = {
  company: {},
  error: ''
}

// ACTIONS
const SET_ERROR = 'SET_ERROR'
const SET_COMPANY = 'SET_COMPANY'
const REMOVE_COMPANY = 'REMOVE_COMPANY'

// ACTION CREATORS

const setCompany = company => ({type: SET_COMPANY, company})
const setError = error => ({type: SET_ERROR, error})
const removeCompany = () => ({type: REMOVE_COMPANY})

//THUNKS//

// PROBLEM SECTIONS
export const company = () => async dispatch => {
  try {
    const res = await axios.get('/auth/company')
    dispatch(setCompany(res.data))
  } catch (err) {
    console.error(err)
  }
}

export const addCustomProblem = (companyId, problem) => {
  return async dispatch => {
    try {
      const {data} = await axios.post(
        `/api/company/customproblem/${companyId}/`,
        problem
      )
      dispatch(setCompany(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const removeCustomProblem = (companyId, problemId) => {
  return async dispatch => {
    try {
      const {data} = await axios.delete(
        `/api/company/${companyId}/${problemId}`
      )
      dispatch(setCompany(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const updateCustomProblem = (companyId, problemId, update) => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/company/${companyId}/${problemId}`, {
        update
      })
      dispatch(setCompany(data))
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
      await axios.post(`/api/company/addSolution/${companyId}/${problemId}`, {
        userId,
        name,
        solution,
        isSolved
      })
      // dispatch(setCompany(companyId))
    } catch (error) {
      console.log(error)
    }
  }
}

// COMPANY SECTION

export const companyMe = () => {
  return async dispatch => {
    const result = await axios.get('auth/company')
    dispatch(setCompany(result.data))
  }
}

export const companySignup = (
  companyName,
  companyInfo,
  companyIndustry,
  email,
  password
) => {
  return async dispatch => {
    try {
      const {data} = await axios.post('/api/company/signup', {
        companyName,
        companyInfo,
        companyIndustry,
        email,
        password
      })
      dispatch(setCompany(data))
    } catch (error) {
      dispatch(setError(error.response.data))
    }
  }
}

export const companyLogin = (email, password) => {
  return async dispatch => {
    try {
      const {data} = await axios.put('/api/company/login', {email, password})
      dispatch(setCompany(data))
    } catch (error) {
      dispatch(setError(error.response.data))
    }
  }
}

export const updateCompany = (id, update) => {
  return async dispatch => {
    try {
      const {data} = await axios.put(`/api/company/${id}`, {update})
      dispatch(setCompany(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const logout = () => async dispatch => {
  try {
    await axios.post('/api/company/logout')
    dispatch(removeCompany())
  } catch (error) {
    console.log(error)
  }
}

// COMPANY SAVED USER SECTION

export const addSavedUser = (companyId, userId) => {
  return async dispatch => {
    try {
      const {data} = await axios.post(`/api/company/${companyId}/${userId}`)
      dispatch(setCompany(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export const deleteSavedUser = (companyId, userId) => {
  return async dispatch => {
    try {
      const {data} = await axios.delete(`/api/company/${companyId}/${userId}`)
      dispatch(setCompany(data))
    } catch (error) {
      console.log(error)
    }
  }
}

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_COMPANY:
      return {error: '', company: action.company}
    case REMOVE_COMPANY:
      return {error: '', company: {}}
    case SET_ERROR:
      return {...state, error: action.error}
    default:
      return state
  }
}
