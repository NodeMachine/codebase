import React, {Component} from 'react'
import UserProblemsList from './userProblemsList'
import {connect} from 'react-redux'
import UserInformation from './userInformation'
import {UserAnalytics} from './userAnalytics'
import {Redirect} from 'react-router-dom'
import UploadProfilePic from './uploadProfilePic'
import './userProfile.css'

const UserProfile = props => {
  const user = props.user
  let problems = []
  if (user.problems) {
    problems = Object.values(user.problems)
  }

  // handleEdit(event) {
  //   event.preventDefault()
  //   const user = this.props.user
  //   this.setState({
  //     bio: user.bio || '',
  //     interests: user.interests || '',
  //     location: user.location || '',
  //     toggle: true
  //   })
  // }
  return (
    <div className="user-profile-container">
      <div className="profile-left">
        <hr />
        <div className="profile-main-info">
          <h1>Score: {user.score}</h1>
          <img
            src={
              user && user.photo
                ? user.photo
                : 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'
            }
          />
          <UploadProfilePic />
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
        <hr />
        <h2>Your Problems</h2>
        <hr />
        {problems.length ? (
          <UserAnalytics problems={problems} />
        ) : (
          <h4> Solve some problems to see analytics.</h4>
        )}
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

const mapStateToProps = state => ({
  user: state.user.singleUser
})

const mapDispatchToProps = dispatch => ({
  profilepic: (id, pic) => dispatch(updateProfilePic(id, pic))
})

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile)
