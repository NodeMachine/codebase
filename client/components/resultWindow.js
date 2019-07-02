import React, {Component} from 'react'

const ResultWindow = props => {
  console.log('ResultWindow props: ', props)

  return (
    <div>
      ... and this is a result window!
      <p>{props.result}</p>
    </div>
  )
}

export default ResultWindow
