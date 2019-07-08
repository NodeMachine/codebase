import React from 'react'
import {Link} from 'react-router-dom'
import {IconContext} from 'react-icons'
import {MdKeyboardArrowRight} from 'react-icons/md'

export const ProblemListItem = props => {
  const el = props.problem
  return (
    <div key={el.id}>
      <div className="problem-list-item-container">
        <div className="problem-list-item problemName">
          <IconContext.Provider
            value={{
              color: '#26C6DA',
              display: 'inline'
            }}
          >
            <MdKeyboardArrowRight />
          </IconContext.Provider>
          <Link
            to={{
              pathname: `/problems/${el.id}`
            }}
          >
            <h4>{el.name}</h4>
          </Link>
        </div>
        <div className="problem-list-item">
          <h4>{el.category}</h4>
        </div>
        <div className="problem-list-item">
          <h4>{el.points < 50 ? 'Easy' : 'Medium'}</h4>
        </div>
        <div className="problem-list-item">
          <h4>{el.points}</h4>
        </div>
      </div>
      <hr />
    </div>
  )
}
