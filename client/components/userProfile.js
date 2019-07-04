import React, {Component} from 'react'
import UserProblemsList from './userProblemsList'
import {connect} from 'react-redux'
import {updateProfile} from '../store/user'

// Until we have a CSS file
const styles = {
  photo: {borderRadius: 300},
  icon: {marginTop: 30}
}

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

  handleChange(event) {
    event.preventDefault()
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.update(this.props.user.id, this.state)
    this.setState({toggle: false})
  }

  // eslint-disable-next-line complexity
  render() {
    const user = this.props.user
    let problems = []
    if (user.problems) {
      problems = Object.values(user.problems)
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
                    src={user && user.photo ? user.photo : null}
                  />
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
                      <form onSubmit={this.handleSubmit}>
                        {!this.state.toggle ? (
                          <div>
                            <h5>
                              Location: {user.location || 'Add a location'}
                            </h5>
                          </div>
                        ) : (
                          <div>
                            <h5>Location:</h5>
                            <input
                              type="text"
                              name="location"
                              onChange={this.handleChange}
                              placeholder={this.state.location}
                            />
                          </div>
                        )}
                        {!this.state.toggle ? (
                          <div>
                            <h5>Bio: {user.bio || 'Add a bio'}</h5>
                          </div>
                        ) : (
                          <div>
                            <h5>Bio:</h5>
                            <input
                              type="text"
                              name="bio"
                              onChange={this.handleChange}
                              placeholder={this.state.bio}
                            />
                          </div>
                        )}
                        {!this.state.toggle ? (
                          <div>
                            <h5>Interests: {user.interests || 'Interests'}</h5>
                          </div>
                        ) : (
                          <div>
                            <h5>Interests:</h5>
                            <input
                              type="text"
                              name="interests"
                              onChange={this.handleChange}
                              placeholder={this.state.interests}
                            />
                          </div>
                        )}
                        <h5>Email: {user.email}</h5>
                        {this.state.toggle && (
                          <button type="submit">Submit</button>
                        )}
                      </form>
                    </div>

                    <div className="col s3">
                      {!this.state.toggle ? (
                        <i
                          className="small material-icons "
                          style={styles.icon}
                          onClick={this.handleEdit}
                        >
                          edit_circle
                        </i>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card">
            <div className="col s6 card-content grey lighten-4">
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
}

const mapStateToProps = state => ({
  user: state.user.singleUser
})

const mapDispatchToProps = dispatch => ({
  update: (id, obj) => dispatch(updateProfile(id, obj))
})

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile)
