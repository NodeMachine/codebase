import React from 'react'
import {connect} from 'react-redux'
import {addSavedUser} from '../store/company'

const DeveloperListItem = props => {
  const user = props.user
  const company = props.company

  return (
    <li className="developer-list-item" key={user.id}>
      <h6>
        {user.firstName} {user.lastName}
        {user.score}
      </h6>
      <button
        type="button"
        onClick={evt => {
          evt.preventDefault()
          props.addSavedUser(company.id, user.id)
        }}
      >
        SAVE USER
      </button>
    </li>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    addSavedUser: (companyId, userId) =>
      dispatch(addSavedUser(companyId, userId))
  }
}

export default connect(null, mapDispatchToProps)(DeveloperListItem)
