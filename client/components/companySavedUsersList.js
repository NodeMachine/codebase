import React from 'react'

const CompanySavedUsersList = props => {
  return (
    <ul>
      {props.savedUsers.map(user => {
        return (
          <li key={user.id}>
            <h3>
              {user.firstName} {user.LastName}
            </h3>
            <p>{user.score}</p>
            <button
              type="button"
              onClick={() => props.removeUser(props.id, user.id)}
            />
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

export default CompanySavedUsersList
