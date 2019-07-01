import React, {Component} from 'react'
import AceCode from './acecode'
import ProblemDescription from './problemDescription'
import {connect} from 'react-redux'
import {getSingleProblem} from '../store/problems'
import ResultWindow from './resultWindow'

class SingleProblem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      code: ''
    }
  }

  componentDidMount() {
    this.props.getSingleProblem(this.props.match.params.id)
  }

  render() {
    console.log('Props in single problem ', this.props)
    return (
      <div style={style.outerDiv}>
        <AceCode />
        <ProblemDescription
          prompt={
            this.props.problem.length ? this.props.problem[0].prompt : false
          }
        />
        <ResultWindow />
      </div>
    )
  }
}

const style = {
  outerDiv: {
    display: 'flex'
  }
}

const mapState = state => {
  return {
    problem: state.problems
  }
}

const mapDispatch = dispatch => {
  return {
    getSingleProblem: problemId => dispatch(getSingleProblem(problemId))
  }
}

export default connect(mapState, mapDispatch)(SingleProblem)
