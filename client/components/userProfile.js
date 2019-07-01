import React, {Component} from 'react'
import UserProblemsList from './userProblemsList'
import {connect} from 'react-redux'

// Until we have a CSS file
const styles = {
  photo: {borderRadius: 300},
  icon: {marginTop: 30}
}

class UserProfile extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const user = this.props.user
    return (
      <div>
        <div className="row">
          <div className="card">
            <div className="col s6">
              <div className="row">
                <div className="col s6 card-image">
                  <img style={styles.photo} src={user.photo} />
                </div>

                <div className="col s6 card-content">
                  <h1>
                    {user.firstName} {user.lastName}
                  </h1>
                  <h3>Score: {user.score}</h3>
                </div>

                <div className="col s12 card-content">
                  <div className="row">
                    <div className="col s9">
                      <h4>Location: {user.location}</h4>
                      <h5>Bio: {user.bio}</h5>
                      <h5>Interests: {user.interests}</h5>
                      <h5>Email: {user.email}</h5>
                    </div>

                    <div className="col s3">
                      <i className="small material-icons " style={styles.icon}>
                        edit_circle
                      </i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="col s6 card-content grey lighten-4">
              <h2>Past Problems:</h2>
              <UserProblemsList userProblems={user.problems} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  user: state.singleUser
})

export default connect(mapStateToProps)(UserProfile)
