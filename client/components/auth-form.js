import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {login, signup} from '../store/user'
import {companyLogin, companySignup} from '../store/company'
import {Redirect} from 'react-router-dom'
import './auth-form.css'

/**
 * COMPONENT
 */
class AuthForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      password: '',
      email: '',
      isCompany: false
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    event.preventDefault()
    this.setState({[event.target.name]: event.target.value})
  }

  isCompanyToggle() {
    this.setState({isCompany: !this.state.isCompany})
  }

  render() {
    const {name, displayName, handleSubmit, error} = this.props
    if (this.props.company.id) {
      this.props.history.push('/companyprofile')
    } else if (this.props.user.id) {
      this.props.history.push('/profile')
    }
    return (
      <div id="form-wrapper">
        <h2 id="form-title">{displayName}</h2>
        <form
          onSubmit={event => {
            this.props.handleSubmit(event)
            if (!this.props.error) {
              this.setState({email: '', password: ''})
            }
          }}
          name={name}
        >
          <div>
            <label htmlFor="isCompany">Are you a company? </label>
            <input
              type="checkbox"
              id="companyCheckbox"
              name="isCompany"
              onChange={() => this.isCompanyToggle()}
              // checked='true'
            />
          </div>

          <div>
            <label htmlFor="email">
              <small>Email</small>
            </label>
            <input
              name="email"
              type="email"
              onChange={this.handleChange}
              value={this.state.email}
            />
          </div>
          <div>
            <label htmlFor="password">
              <small>Password </small>
            </label>
            <input
              name="password"
              type="password"
              onChange={this.handleChange}
              value={this.state.password}
            />
            <small>Passwords must be at least 6 characters.</small>
          </div>

          {name === 'signup' && !this.state.isCompany ? (
            <div>
              <label htmlFor="firstName">
                <small>First Name</small>
              </label>
              <input name="firstName" type="text" />
            </div>
          ) : null}

          {name === 'signup' && this.state.isCompany ? (
            <div>
              <label htmlFor="companyName">
                <small>Company Name</small>
              </label>
              <input name="companyName" type="text" />
              <label htmlFor="companyInfo">
                <small>Company Info</small>
              </label>
              <input name="companyInfo" type="text" />
              <label htmlFor="companyIndustry">
                <small>Company Industry</small>
              </label>
              <input name="companyIndustry" type="text" />
            </div>
          ) : null}

          {name === 'signup' && !this.state.isCompany ? (
            <div>
              <label htmlFor="lastName">
                <small>Last Name</small>
              </label>
              <input name="lastName" type="text" />
            </div>
          ) : null}
          <div>
            <button
              type="submit"
              disabled={
                !(this.state.email.length && this.state.password.length >= 6)
              }
            >
              {displayName}
            </button>
            {this.props.error ? (
              <small style={{color: 'red'}}>{this.props.error}</small>
            ) : null}
          </div>
          {error && error.response && <div> {error.response.data} </div>}
        </form>
      </div>
    )
  }
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error,
    company: state.company.company,
    user: state.user.singleUser
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error,
    company: state.company.company,
    user: state.user.singleUser
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      try {
        evt.preventDefault()
        const formName = evt.target.name
        const email = evt.target.email.value
        const password = evt.target.password.value
        const isCompany = evt.target.isCompany.checked

        if (formName === 'login') {
          //LOGIN FOR REGULAR USER:
          if (!isCompany) {
            dispatch(login(email, password))
          } else {
            dispatch(companyLogin(email, password))
          }
        } else {
          //IF COMPANY NAME IS SIGNUP:
          if (!isCompany) {
            const firstName = evt.target.firstName.value
            const lastName = evt.target.lastName.value
            dispatch(signup(firstName, lastName, email, password))
          } else {
            const companyName = evt.target.companyName.value
            const companyInfo = evt.target.companyInfo.value
            const companyIndustry = evt.target.companyIndustry.value
            dispatch(
              companySignup(
                companyName,
                companyInfo,
                companyIndustry,
                email,
                password
              )
            )
          }
        }
      } catch (error) {
        console.log(error)
      }
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
