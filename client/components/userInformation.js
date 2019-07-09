import React, {Component} from 'react'
import {connect} from 'react-redux'
import {updateProfile} from '../store/user'
import './userProfile.css'
import {IconContext} from 'react-icons'
import {MdModeEdit} from 'react-icons/md'

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
        <div id="text-box">
          <div>
            <h5>Location: </h5> <p>{user.location || 'Add a location'}</p>
          </div>
          <div>
            <h5>Bio: </h5> <p>{user.bio || 'Add a bio'}</p>
          </div>
          <div>
            <h5>Interests: </h5> <p>{user.interests || 'Interests'}</p>
          </div>
          <div>
            <h5>Email: </h5> <p>{user.email}</p>
          </div>
        </div>

        <div>
          <MdModeEdit onClick={this.handleEdit} />
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
