import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'

//console.log("isLoggedIn navbar: ", isLoggedIn);
const Navbar = ({handleClick, isLoggedIn, ourState}) => {
  //console.log('req.session.userId: ', req.session.userId);
  return (
    <div>
      <nav>
        <Link to="/">Our Codewars Clone</Link>
        {isLoggedIn ? (
          <div className="right">
            {/* The navbar will show these links after you log in */}
            <Link to="/problems">Problems</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/" onClick={handleClick}>
              Logout
            </Link>
          </div>
        ) : (
          <div className="right">
            {/* The navbar will show these links before you log in */}
            <Link to="/problems">Problems</Link>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign Up</Link>
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
