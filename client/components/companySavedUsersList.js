import React from 'react'
import axios from 'axios'
import {deleteSavedUser} from '../store/company'
import {connect} from 'react-redux'

class CompanySavedUsersList extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      savedUsersArray: []
    }
  }
  async componentDidMount() {
    const promiseList = this.props.users.map(async userId => {
      const {data} = await axios.get(`/api/users/${userId}`)
      return data
    })
    const newArr = await Promise.all(promiseList)
    this.setState({savedUsersArray: newArr})
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.savedUsersArray.length
            ? this.state.savedUsersArray.map(user => {
                return (
                  <li key={user.id}>
                    <h3>
                      {user.firstName || ''} {user.LastName || ''}
                    </h3>
                    <p>{user.score || ''}</p>
                    <button
                      type="button"
                      onClick={() =>
                        this.props.deleteUser(this.props.company.id, user.id)
                      }
                    >
                      Remove User
                    </button>
                    <details>
                      <h4>User solutions</h4>
                      <details>
                        {/* {user.problems.length
                  ? user.problems.map(problem => {
                      return (
                        <div key={problem.id}>
                          <p>{problem.name || ''}</p>
                          <p>{problem.isSolved || ''}</p>
                          <details>
                            <code>{problem.solution || ''}</code>
                          </details>
                        </div>
                      )
                    })
                  : 'No problems yet.'} */}
                      </details>
                    </details>
                  </li>
                )
              })
            : ''}
        </ul>
      </div>
    )
  }
}

// const mapStateToProps = state => ({
//   company: state.company.company
// })

const mapDispatchToProps = dispatch => ({
  deleteUser: (companyId, userId) =>
    dispatch(deleteSavedUser(companyId, userId))
})

export default connect(null, mapDispatchToProps)(CompanySavedUsersList)

{
  /* <div>
<ul>
  {savedUsersArray.length
    ? savedUsersArray.map(user => {
        return (
          <li key={user.id}>
            <h3>
              {user.firstName || ''} {user.LastName || ''}
            </h3>
            {/* <p>{user.score || ''}</p>
            <button
              type="button"
              onClick={() => props.deleteUser(props.company.id, user.id)}
            >
              Remove User
            </button> */
}
{
  /* <details> */
}
{
  /* <h4>User solutions</h4> */
}
{
  /* <details>
          {user.problems.length
            ? user.problems.map(problem => {
                return (
                  <div key={problem.id}>
                    <p>{problem.name || ''}</p>
                    <p>{problem.isSolved || ''}</p>
                    <details>
                      <code>{problem.solution || ''}</code>
                    </details>
                  </div>
                )
              })
            : 'No problems yet.'}
        </details> */
}
{
  /* </details> */
}
// </li>
// )
// })
// : ''}
// </ul>
// </div> */}
