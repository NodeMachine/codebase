import React from 'react'
import {Link} from 'react-router-dom'
import './userProfile.css'

const UserProblemList = props => {
  return (
    <div className="user-problems">
      <ul>
        {props.problems.map((el, indx) => {
          return (
            <li key={indx}>
              <div className="user-problem">
                <div className="user-problem-item">
                  <Link to={`/problems/${el.id}`}>
                    <h4>{el.name}</h4>
                  </Link>
                </div>
                <div className="user-problem-item">
                  <h5>{el.category}</h5>
                </div>
                <div className="user-problem-item">
                  <p>Difficulty: {el.points < 100 ? 'Easy' : 'Medium'}</p>
                </div>
                <div className="user-problem-item">
                  <p>{el.points}</p>
                </div>
                <div className="user-problem-item">
                  {el.isSolved ? <p>Completed</p> : <p>Pending</p>}
                </div>
              </div>
              <hr />
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default UserProblemList
