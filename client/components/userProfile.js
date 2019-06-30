import React, {Component} from 'react'
import UserProblemsList from './userProblemsList'

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
            <div className="col s3 card-image">
              <img src={this.state.user.photo} />
            </div>
            <div className="col s3 card-content">
              <h1>
                {this.state.user.firstName} {this.state.user.lastName}
              </h1>
              <h4>{this.state.user.location}</h4>
              <p>{this.state.user.bio}</p>
              <p>Interests: {this.state.user.interests}</p>
            </div>
          </div>
          <div className="col s6 card-content">
            <h2>Past Problems:</h2>
            <UserProblemsList userProblems={this.state.userProblems} />
          </div>
        </div>
      </div>
    )
  }
}

export default UserProfile
