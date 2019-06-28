import React, {Component} from 'react'

// Until we have a CSS file
const styles = {
  listItem: {display: 'flex'}
}

const ProblemList = props => {
  return (
    <ul>
      {props.problems.map(el => {
        return (
          <li key={el.id} style={styles.listItem}>
            <h1>{el.category}</h1>
            <h2>{el.title}</h2>
            <p>Difficulty: {el.points < 100 ? 'Easy' : 'Medium'}</p>
          </li>
        )
      })}
    </ul>
  )
}

export default ProblemList
