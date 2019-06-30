import React from 'react'

// Until we have a CSS file
const styles = {
  icon: {marginTop: 30}
}

const UserProblemList = props => {
  return (
    <ul>
      {props.userProblems.map(el => {
        return (
          <li key={el.id}>
            <div className="divider card" />
            <div className="row section card-content">
              <div className="col s8">
                <h3>{el.title}</h3>
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
