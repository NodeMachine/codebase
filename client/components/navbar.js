import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

//console.log("isLoggedIn navbar: ", isLoggedIn);
const Navbar = ({handleClick, isLoggedIn, ourState}) => {
  console.log('ourState in navbar: ', ourState)
  console.log('isLoggedIn navbar: ', isLoggedIn)
  return (
    <div>
      <nav>
        <a>Our Codewars Clone</a>
        {isLoggedIn ? (
          <div className="right">
            {/* The navbar will show these links after you log in */}
            <Link to="/home">Home</Link>
            <a href="#" onClick={handleClick}>
              Logout
            </a>
          </div>
        ) : (
          <div className="right">
            {/* The navbar will show these links before you log in */}
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
            <Link to="/profile">Profile</Link>
          </div>
        )}
      </nav>
      <hr />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  console.log('state in navbar: ', state)
  return {
    ourState: state,
    //isLoggedIn: !!state.user.id
    isLoggedIn: !!state.user.singleUser.authId
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
