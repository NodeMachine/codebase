import React, {Component} from 'react'
import {connect} from 'react-redux'

const ProblemDescription = props => {
  return <div>{props.prompt}</div>
}

export default ProblemDescription
