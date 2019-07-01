import React, {Component} from 'react'
import {connect} from 'react-redux'

const ProblemDescription = props => {
  console.log('Problem description ', props)
  return <div>{props.prompt}</div>
}

// const mapState = state => {
//   return {
//     prompt: state.problems[0].prompt
//   }
// }

export default ProblemDescription
