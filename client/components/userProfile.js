import React, {Component} from 'react'

// Until we have a CSS file
const styles = {
  userInfo: {display: 'flex'}
}

class UserProfile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      id: 1,
      firstName: 'John',
      lastName: 'Smith',
      location: 'New York',
      bio: 'Likes to set up Docker containers for fun',
      interests: 'Docker'
    }
  }
  render() {
    return (
      <div style={styles.userInfo}>
        <h1>
          {this.state.firstName} {this.state.lastName}
        </h1>
        <h2>"City:"{this.state.location}</h2>
        <p>"Bio:"{this.state.bio}</p>
        <p>"Interests:"{this.state.interests}</p>
      </div>
    )
  }
}

export default UserProfile
