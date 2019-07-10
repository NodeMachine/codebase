import React from 'react'
import {connect} from 'react-redux'
import {addSavedUser, deleteSavedUser} from '../store/company'

const DeveloperListItem = props => {
  const user = props.user
  const company = props.company
  const savedUsers = props.savedUsers
  return (
    <li className="developer-list-item" key={user.id}>
      <h5 className="developer-info name">
        {user.firstName} {user.lastName}
      </h5>
      <h5 className="developer-info">{user.score}</h5>
      <h5 className="developer-info">{user.bio}</h5>
      <h5 className="developer-info">{user.location}</h5>
      {savedUsers.includes(user.id) ? (
        <button
          className="delete"
          type="button"
          onClick={evt => {
            evt.preventDefault(props.removeUser(company.id, user.id))
          }}
        >
          {' '}
          DELETE DEVELOPER
        </button>
      ) : (
        <button
          type="button"
          onClick={evt => {
            evt.preventDefault()
            props.addSavedUser(company.id, user.id)
          }}
        >
          SAVE DEVELOPER
        </button>
      )}
      <hr />
    </li>
  )
}

const mapStateToProps = state => ({
  savedUsers: state.company.company.savedUsers,
  company: state.company.company
})

const mapDispatchToProps = dispatch => {
  return {
    addSavedUser: (companyId, userId) =>
      dispatch(addSavedUser(companyId, userId)),
    removeUser: (companyId, userId) =>
      dispatch(deleteSavedUser(companyId, userId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeveloperListItem)
