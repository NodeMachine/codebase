import React from 'react'
import {Link} from 'react-router-dom'
import './userProfile.css'

const UserProblemList = props => {
  console.log(props)
  return (
    <div className="user-problems">
      <ul>
        {props.problems.map((el, indx) => {
          return (
            <li key={indx}>
              <div className="user-problem">
                <Link to={`/problems/${el.id}`}>{el.name}</Link>
                <h5>{el.category}</h5>
                <p>Difficulty: {el.points < 100 ? 'Easy' : 'Medium'}</p>
                <p>{el.points}</p>
                {el.isSolved ? <p>Completed</p> : <p>Pending</p>}
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default UserProblemList
