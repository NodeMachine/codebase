import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getAllUsers} from '../store/user'
import DeveloperListItem from './developerListItem'

///PROGRAMMING/Fullstack_Academy/capstone/codebase/client/store/company.js
///PROGRAMMING/Fullstack_Academy/capstone/codebase/client/components/companyHome.js

// /PROGRAMMING/Fullstack_Academy/capstone/codebase/client/components/companyHome.js

class CompanyHome extends Component {
  constructor(props) {
    super(props)
  }
  // handleClick = (userId) => {
  //   console.log('SAVE button clicked! ');
  //   this.props.addSavedUser(this.props.companyId, userId);
  // }
  componentDidMount() {
    //console.log("req.session.userId: ", req.session.userId);
    this.props.getAllUsers()
    //this.props.companyId, userId
  }

  render() {
    return (
      <div>
        <div>Welcome, company {this.props.company.companyName || ''}</div>
        <div>Here are all the users with ranking:</div>
        <ol>
          {this.props.users.length
            ? this.props.users.map(user => {
                return (
                  <DeveloperListItem
                    user={user}
                    key={user.id}
                    company={this.props.company}
                  />
                )
              })
            : ''}
        </ol>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    company: state.company.company,
    users: state.user.allUsers
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllUsers: () => dispatch(getAllUsers())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanyHome)

{
  /* <div>Welcome, company {this.props.companyName}</div> */
}
{
  /* <div>Here are all the users with ranking:</div> */
}
{
  /* <ol>
  {this.props.users
    ? this.props.users.map(user => {
        return (
          <li id="user" key={user.id}>
            <h6>
              {user.firstName} {user.lastName}
              {user.score}
            </h6>
          </li>
        )
      })
    : ''}
  <button
    type="submit"
    onClick={() => {
      console.log('this.props.companyId: ', this.props.companyId)
      console.log('user.id: ', user.id)
      this.props.addSavedUser(this.props.companyId, user.id)
    }}
  >
    SAVE USER
  </button>
</ol> */
}
