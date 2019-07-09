import React from 'react'
import {connect} from 'react-redux'
import {addSavedUser} from '../store/company'

const DeveloperListItem = props => {
  const user = props.user
  const company = props.company

  return (
    <li className="developer-list-item" key={user.id}>
      <h5>
        Developer Name: <br />
        {user.firstName} {user.lastName}
      </h5>
      <h5>
        Developer Score:<br />
        {user.score}
      </h5>
      <button
        type="button"
        onClick={evt => {
          evt.preventDefault()
          props.addSavedUser(company.id, user.id)
        }}
      >
        SAVE USER
      </button>
      <hr />
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
