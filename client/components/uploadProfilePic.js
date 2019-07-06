import {updateProfilePic} from '../store/user'
import {connect} from 'react-redux'
import React from 'react'

class UploadProfilePic extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      editMode: false
    }
    this.toggleEdit = this.toggleEdit.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  toggleEdit() {
    const toggled = !this.state.editMode
    this.setState({editMode: toggled})
  }

  handleSubmit(evt) {
    evt.preventDefault()
    const pic = evt.target.photo.files[0]
    this.props.profilepic(this.props.user.id, pic)
    this.toggleEdit()
  }

  render() {
    if (this.state.editMode) {
      return (
        <form onSubmit={this.handleSubmit}>
          <input type="file" name="photo" accept="image/png, image/jpeg" />
          <button type="submit">Submit photo</button>
        </form>
      )
    } else {
      return (
        <button
          type="button"
          onClick={this.toggleEdit}
          id="edit-picture-button"
        >
          Edit pic
        </button>
      )
    }
  }
}

const mapStateToProps = state => ({
  user: state.user.singleUser
})

const mapDispatchToProps = dispatch => ({
  profilepic: (id, pic) => dispatch(updateProfilePic(id, pic))
})

export default connect(mapStateToProps, mapDispatchToProps)(UploadProfilePic)
