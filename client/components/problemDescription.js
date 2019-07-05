import React, {Component} from 'react'
import {connect} from 'react-redux'

const ProblemDescription = props => {
  return (
    <div>
      <h4>The Problem</h4>
      <hr />
      <p>{props.prompt}</p>
    </div>
  )
}

export default ProblemDescription
