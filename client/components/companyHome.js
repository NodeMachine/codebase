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
      <div id="company-home-container">
        <ul id="developer-list-container">
          <li className="developer-list-item" key={Math.random()}>
            <h3 className="developer-info name">Name</h3>
            <h3 className="developer-info">Score</h3>
            <h3 className="developer-info">Bio</h3>
            <h3 className="developer-info location">Location</h3>

            <hr id="title-divider" />
          </li>
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
