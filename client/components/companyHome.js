import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getAllUsers} from '../store/user'
import DeveloperListItem from './developerListItem'
import './companyHome.css'

class CompanyHome extends Component {
  componentDidMount() {
    this.props.getAllUsers()
  }

  render() {
    return (
      <div>
        <div>Welcome, company {this.props.company.companyName || ''}</div>
        <div>Here are all the users with ranking:</div>
        <ul id="developer-list-container">
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
        </ul>
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
