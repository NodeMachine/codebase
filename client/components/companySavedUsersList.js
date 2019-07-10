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
    if (this.props.savedUsers.length) {
      const promiseList = this.props.savedUsers.map(async userId => {
        const {data} = await axios.get(`/api/users/${userId}`)
        return data
      })
      const newArr = await Promise.all(promiseList)
      this.setState({savedUsersArray: newArr})
    }
  }

  render() {
    const savedUsersArray = this.state.savedUsersArray
    return (
      <div>
        <ul>
          {savedUsersArray.length
            ? savedUsersArray.map(user => {
                console.log(user)
                return (
                  <li key={user.id}>
                    <h3>
                      {user.firstName || ''} {user.LastName || ''}
                    </h3>
                    <p>{user.score || ''}</p>
                    <button
                      type="button"
                      onClick={() => {
                        this.props.deleteUser(this.props.companyId, user.id)
                        const updatedUsersArray = savedUsersArray.filter(el => {
                          return el.id !== user.id
                        })
                        this.setState({savedUsersArray: updatedUsersArray})
                      }}
                    >
                      Remove User
                    </button>
                    <details>
                      <h4>User solutions</h4>
                      <details>
                        {user.problems && user.problems.length
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

const mapStateToProps = state => ({
  companyId: state.company.company.id,
  savedUsers: state.company.company.savedUsers
})

const mapDispatchToProps = dispatch => ({
  deleteUser: (companyId, userId) =>
    dispatch(deleteSavedUser(companyId, userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(
  CompanySavedUsersList
)
