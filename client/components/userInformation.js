import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updateProfile} from '../store/user'
import './userProfile.css'

class UserInformation extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.state = {
      editMode: false,
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
      editMode: true
    })
  }

  handleChange(event) {
    event.preventDefault()
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.update(this.props.user.id, this.state)
    this.setState({editMode: false})
  }

  render() {
    const user = this.props.user

    if (this.state.editMode) {
      return (
        <div>
          <form
            className="profile-description-form"
            onSubmit={this.handleSubmit}
          >
            <div>
              <h5>Location:</h5>
              <input
                type="text"
                name="location"
                onChange={this.handleChange}
                placeholder={this.state.location}
              />
            </div>
            <div>
              <h5>Bio:</h5>
              <input
                type="text"
                name="bio"
                onChange={this.handleChange}
                placeholder={this.state.bio}
              />
            </div>
            <div>
              <h5>Interests:</h5>
              <input
                type="text"
                name="interests"
                onChange={this.handleChange}
                placeholder={this.state.interests}
              />
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      )
    }

    return (
      <div className="profile-description">
        <div>
          <div>
            <h5>Location: {user.location || 'Add a location'}</h5>
          </div>
          <div>
            <h5>Bio: {user.bio || 'Add a bio'}</h5>
          </div>
          <div>
            <h5>Interests: {user.interests || 'Interests'}</h5>
          </div>
          <div>
            <h5>Email: {user.email}</h5>
          </div>
        </div>

        <div>
          <i className="small material-icons " onClick={this.handleEdit}>
            edit_circle
          </i>
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

export default connect(mapStateToProps, mapDispatchToProps)(UserInformation)
