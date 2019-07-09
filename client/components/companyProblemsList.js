import React from 'react'
import {addSavedUser, deleteSavedUser} from '../store/company'
import {connect} from 'react-redux'

const CompanyProblemsList = props => {
  return (
    <ul>
      {props.problems.map(problem => {
        return (
          <li key={problem.id}>
            <h3>{problem.name}</h3>
            <p>{problem.prompt}</p>
            <a
              href={`https://nodemachine.herokuapp.com/problems/${id}/${
                props.id
              }`}
            >
              Link link link
            </a>
            <details>
              {problem.users.map(user => {
                return (
                  <div key={user.id}>
                    <p>user.name</p>
                    <p>user.pass</p>
                    {props.savedUsers.includes(user.id) ? (
                      <button
                        type="button"
                        onClick={() => props.deleteUser(props.id, user.id)}
                      >
                        Remove user
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => props.addUser(props.id, user.id)}
                      >
                        Save user
                      </button>
                    )}
                    <details>
                      <code>user.solution</code>
                    </details>
                  </div>
                )
              })}
            </details>
          </li>
        )
      })}
    </ul>
  )
}

const mapStateToProps = state => ({
  problems: state.company.company.customProblems,
  savedUsers: state.company.company.savedUsers,
  id: state.company.company.id
})

const mapDispatchToProps = dispatch => ({
  deleteUser: (companyId, userId) =>
    dispatch(deleteSavedUser(companyId, userId)),
  addUser: (companyId, userId) => dispatch(addSavedUser(companyId, userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(CompanyProblemsList)
