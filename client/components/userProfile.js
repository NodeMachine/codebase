import React, {Component} from 'react'
import UserProblemsList from './userProblemsList'

// Until we have a CSS file
const styles = {
  photo: {borderRadius: 300},
  icon: {marginTop: 30}
}

class UserProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: {
        id: 1,
        firstName: 'John',
        lastName: 'Smith',
        location: 'New York',
        bio: 'Likes to set up Docker containers for fun',
        interests: 'Docker',
        score: 38,
        email: 'email@emai.com',
        photo: 'https://i.ebayimg.com/images/g/eYkAAOSwALtaWWmr/s-l300.jpg'
      },
      userProblems: [
        {
          id: 1,
          title: 'Sum two digits',
          points: 80,
          category: 'arrays',
          isSolved: 0
        },
        {
          id: 2,
          title: 'Return a string',
          points: 1,
          category: 'strings',
          isSolved: 1
        }
      ]
    }
  }
  render() {
    return (
      <div>
        <div className="row">
          <div className="card">
            <div className="col s6">
              <div className="row">
                <div className="col s6 card-image">
                  <img style={styles.photo} src={this.state.user.photo} />
                </div>

                <div className="col s6 card-content">
                  <h1>
                    {this.state.user.firstName} {this.state.user.lastName}
                  </h1>
                  <h3>Score: {this.state.user.score}</h3>
                </div>

                <div className="col s12 card-content">
                  <div className="row">
                    <div className="col s9">
                      <h4>Location: {this.state.user.location}</h4>
                      <h5>Bio: {this.state.user.bio}</h5>
                      <h5>Interests: {this.state.user.interests}</h5>
                      <h5>Email: {this.state.user.email}</h5>
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
              <UserProblemsList userProblems={this.state.userProblems} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default UserProfile
