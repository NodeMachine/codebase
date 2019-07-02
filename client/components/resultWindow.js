import React, {Component} from 'react'

const ResultWindow = props => {
  return (
    <div>
      ... and this is a result window!
      <ul>
        {props.result.length
          ? props.result.map((result, ind) => <li key={ind}>{result}</li>)
          : ''}
      </ul>
    </div>
  )
}

export default ResultWindow
