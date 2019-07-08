import React from 'react'

// props.saveUser/props.removeUser are placeholders for real function
// built assuming a company has an attached 'savedUsers'

const CompanyProblemsList = props => {
  const savedUserIds = Object.keys(props.savedUsers)
  return (
    <ul>
      {props.problems.map(problem => {
        return (
          <li key="problem.id">
            <h3>{problem.name}</h3>
            <p>{problem.prompt}</p>
            {/* <a>{problem.link || or something so that they can give url to user}</a> */}
            <details>
              {problem.users.map(user => {
                return (
                  <div key={user.id}>
                    <p>user.name</p>
                    <p>user.pass</p>
                    {savedUserIds.contains(user.id) ? (
                      <button
                        type="button"
                        onClick={() => props.removeUser(props.id, user.id)}
                      >
                        Remove user
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => props.saveUser(props.id, user.id)}
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

export default CompanyProblemsList
