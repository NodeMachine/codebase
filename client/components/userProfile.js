import React, {Component} from 'react'
import UserProblemsList from './userProblemsList'
import {connect} from 'react-redux'
import UserInformation from './userInformation'
import {Redirect} from 'react-router-dom'
import './userProfile.css'

class UserProfile extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.state = {
      toggle: false,
      bio: '',
      interests: '',
      location: ''
    }
  }

  handleEdit(event) {
    event.preventDefault()
    const user = this.props.user
    this.setState({
      bio: user.bio || '',
      interests: user.interests || '',
      location: user.location || '',
      toggle: true
    })
  }

  render() {
    return (
      <div className="user-profile-container">
        <div className="profile-left">
          <div className="profile-main-info">
            <h1>Rank: {user.score}</h1>
            <img
              src={
                user && user.photo
                  ? user.photo
                  : 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'
              }
            />
            <h3>
              {user.firstName} {user.lastName}
            </h3>
          </div>
          <hr />
          <div className="">
            <UserInformation />
          </div>
        </div>

        <div className="profile-right">
          <h2>Your Problems</h2>
          <hr />
          {problems.length ? (
            <UserProblemsList problems={problems} />
          ) : (
            <h4>No problems yet!</h4>
          )}
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user.singleUser
})

const mapDispatchToProps = dispatch => ({
  update: (id, obj) => dispatch(updateProfile(id, obj))
})

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile)
