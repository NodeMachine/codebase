import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getAllUsers} from '../store/user'
import {Link} from 'react-router-dom'

// /PROGRAMMING/Fullstack_Academy/capstone/codebase/client/components/companyHome.js

class CompanyHome extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.props.getAllUsers()
  }

  render() {
    return (
      <div>
        <div>Welcome, company {this.props.companyName}</div>
        <div>Here are all the users with a ranking:</div>
        <ol>
          {this.props.users.map(user => {
            return (
              <li key={user.id}>
                <h6>
                  <Link>
                    {user.firstName} {user.lastName}
                  </Link>{' '}
                  {user.score}
                </h6>
              </li>
            )
          })}
        </ol>
      </div>
    )
  }
}

const mapStateToProps = state => {
  console.log('companyHome state: ', state)
  return {
    companyName: state.user.singleUser.firstName,
    users: state.user.allUsers
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllUsers: () => dispatch(getAllUsers())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanyHome)
