import React, {Component} from 'react'
import AceEditor from 'react-ace'
import ProblemDescription from './problemDescription'
import axios from 'axios'
import {connect} from 'react-redux'
import {getSingleProblem} from '../store/problems'
import ResultWindow from './resultWindow'

class SingleProblem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      code: '',
      result: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.getSingleProblem(this.props.match.params.id)
  }

  componentDidUpdate() {
    if (!this.state.code) {
      this.setState({
        code: this.props.problem[0].defaultCode || 'NO CODE DEFINED'
      })
    }
  }

  handleChange(newValue) {
    this.setState({code: newValue})
  }

  handleSubmit() {
    axios
      .post(`/api/solution/${this.props.problem[0].id}`, this.state)
      .then(returnResult => {
        this.setState({result: returnResult.data})
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div>
        <AceEditor
          mode="javascript"
          theme="monokai"
          onChange={this.handleChange}
          name="UNIQUE_ID_OF_DIV"
          value={this.state.code}
          editorProps={{$blockScrolling: true}}
        />
        <button onClick={() => this.handleSubmit()}>Run code</button>
        <ProblemDescription
          prompt={
            this.props.problem.length ? this.props.problem[0].prompt : false
          }
        />
        <ResultWindow result={this.state.result} />
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
