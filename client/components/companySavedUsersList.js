import React from 'react'
import axios from 'axios'
import {deleteSavedUser} from '../store/company'
import {connect} from 'react-redux'

const CompanySavedUsersList = props => {
  const savedUsersArray = props.user.savedUsers.map(async userId => {
    const user = await axios.get(`/api/users/${userId}`)
    return user
  })
  return (
    <ul>
      {savedUsersArray.map(user => {
        return (
          <li key={user.id}>
            <h3>
              {user.firstName} {user.LastName}
            </h3>
            <p>{user.score}</p>
            <button
              type="button"
              onClick={() => props.deleteUser(props.company.id, user.id)}
            >
              Remove User
            </button>
            <details>
              <h4>User solutions</h4>
              <details>
                {user.problems.map(problem => {
                  return (
                    <div key={problem.id}>
                      <p>{problem.name}</p>
                      <p>{problem.isSolved}</p>
                      <details>
                        <code>{problem.solution}</code>
                      </details>
                    </div>
                  )
                })}
              </details>
            </details>
          </li>
        )
      })}
    </ul>
  )
}

const mapStateToProps = state => ({
  company: state.company.company
})

const mapDispatchToProps = dispatch => ({
  deleteUser: (companyId, userId) =>
    dispatch(deleteSavedUser(companyId, userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(
  CompanySavedUsersList
)
