import React from 'react'
import {Link} from 'react-router-dom'

// Until we have a CSS file
const styles = {
  icon: {marginTop: 30}
}

const UserProblemList = props => {
  console.log(props)
  return (
    <ul>
      {props.problems.map((el, indx) => {
        return (
          <li key={indx}>
            <div className="divider card" />
            <div className="row section card-content">
              <div className="col s8">
                <Link to={`/problems/${el.id}`}>{el.name}</Link>
                <h5>{el.category}</h5>
                <p>Difficulty: {el.points < 100 ? 'Easy' : 'Medium'}</p>
              </div>
              <div className="col s4 " style={styles.icon}>
                {el.isSolved ? (
                  <i className="medium material-icons green-text">
                    check_circle
                  </i>
                ) : (
                  <i className="medium material-icons orange-text ">
                    check_circle
                  </i>
                )}
              </div>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export default UserProblemList
