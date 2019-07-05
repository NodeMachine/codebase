import React from 'react'
import UserProblemsList from './userProblemsList'
import {connect} from 'react-redux'
import UserInformation from './userInformation'
import {Redirect} from 'react-router-dom'

// Until we have a CSS file
const styles = {
  photo: {borderRadius: 300}
}

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
    <div>
      <div className="row">
        <div className="card">
          <div className="col s6">
            <div className="row">
              <div className="col s6 card-image">
                <img
                  style={styles.photo}
                  src={
                    user && user.photo
                      ? user.photo
                      : 'https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png'
                  }
                />
              </div>

              <div className="col s6 card-content">
                <h1>
                  {user.firstName} {user.lastName}
                </h1>
                <h3>Score: {user.score}</h3>
              </div>

              <div className="col s12 card-content">
                <UserInformation />
              </div>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="col s6 card-content black lighten-4">
            <h2>Past Problems:</h2>
            {problems.length ? (
              <UserProblemsList problems={problems} />
            ) : (
              <h4>No problems yet!</h4>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.user.singleUser
})

export default connect(mapStateToProps)(UserProfile)
