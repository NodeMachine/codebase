import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getAllUsers} from '../store/user'
import {Link} from 'react-router-dom'
import {addSavedUserThunk} from '../store/company'

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
        <div>Welcome, company {this.props.companyName}</div>
        <div>Here are all the users with ranking:</div>
        <ol>
          {this.props.users.map(user => {
            return (
              <li id="user" key={user.id}>
                <h6>
                  {/* <Link> */}
                  {user.firstName} {user.lastName}
                  {/* </Link>{' '} */}
                  {user.score}
                  {/* <form onSubmit={this.handleSubmit}> */}
                  {/* action={`/${this.props.companyId}/${user.id}`} */}
                  {/* <button onClick={() => this.onClickHandler(user.id)}>SAVE</button> */}
                  <button
                    onClick={() => {
                      console.log(
                        'this.props.companyId: ',
                        this.props.companyId
                      )
                      console.log('user.id: ', user.id)
                      this.props.addSavedUser(this.props.companyId, user.id)
                    }}
                  >
                    SAVE USER
                  </button>
                  {/* </form> */}
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
    users: state.user.allUsers,
    companyId: state.user.singleUser.id
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getAllUsers: () => dispatch(getAllUsers()),
    addSavedUser: (companyId, userId) =>
      dispatch(addSavedUserThunk(companyId, userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanyHome)
