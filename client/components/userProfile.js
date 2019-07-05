import React from 'react'
import UserProblemsList from './userProblemsList'
import {connect} from 'react-redux'
import UserInformation from './userInformation'
import {Redirect} from 'react-router-dom'
import './userProfile.css'

const UserProfile = props => {
  console.log(props)
  const user = props.user
  let problems = []
  if (user.problems) {
    problems = Object.values(user.problems)
  }
  if (!user.id) {
    return <Redirect to="/" />
  }
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
        <h2>Past Problems:</h2>
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

export default connect(mapStateToProps)(UserProfile)
