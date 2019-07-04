import React, {Component} from 'react'
import AceEditor from 'react-ace'
import ProblemDescription from './problemDescription'
import axios from 'axios'
import {connect} from 'react-redux'
import {getSingleProblem} from '../store/problems'
import {saveSolution} from '../store/user'
import ResultWindow from './resultWindow'
import 'brace/mode/javascript'
import 'brace/theme/monokai'

class SingleProblem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      code: '',
      result: []
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleReset = this.handleReset.bind(this)
  }

  componentDidMount() {
    this.props.getSingleProblem(this.props.match.params.id)
  }

  componentDidUpdate() {
    const user = this.props.user
    const problem = this.props.problem
    if (!this.state.code) {
      if (user.problems && user.problems[problem.id]) {
        this.setState({code: user.problems[problem.id].solution})
      } else {
        this.setState({
          code:
            this.props.problem.defaultCode.replace(/\\n/g, '\n') ||
            'NO CODE DEFINED'
        })
      }
    }
  }

  handleChange(newValue) {
    this.setState({code: newValue})
  }

  async handleSubmit() {
    try {
      const {data} = await axios.post(
        `/api/solution/${this.props.problem.id}`,
        this.state
      )
      if (this.props.user.id) {
        const problem = this.props.problem
        const userId = this.props.user.id
        const isSolved = data.every(test => test.pass === true)
        const solution = this.state.code
        this.props.saveSolution(problem, userId, isSolved, solution)
      }
      this.setState({result: data})
    } catch (error) {
      console.error("Something went wrong submitting user's code", error)
      this.setState({result: 'Your code timed out'})
    }
  }

  handleReset() {
    this.setState({code: this.props.problem.defaultCode.replace(/\\n/g, '\n')})
  }

  render() {
    return (
      <div className="singleProblemContainer">
        <div className="codeSandboxContainer">
          <AceEditor
            mode="javascript"
            theme="monokai"
            onChange={this.handleChange}
            name="UNIQUE_ID_OF_DIV"
            value={this.state.code}
            editorProps={{$blockScrolling: true}}
            height="75vh"
            width="50vw"
          />
          <div className="buttonContainer">
            <button onClick={() => this.handleReset()}>Reset code</button>
            <button onClick={() => this.handleSubmit()}>Run code</button>
          </div>
        </div>
        <div className="promptResultContainer">
          <ProblemDescription prompt={this.props.problem.prompt} />
          {Array.isArray(this.state.result) ? (
            <ResultWindow result={this.state.result} />
          ) : (
            <ResultWindow error={this.state.result} />
          )}
        </div>
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
    problem: state.problems.singleProblem,
    user: state.user.singleUser
  }
}

const mapDispatch = dispatch => {
  return {
    getSingleProblem: problemId => dispatch(getSingleProblem(problemId)),
    saveSolution: (problem, userId, isSolved, solution) =>
      dispatch(saveSolution(problem, userId, isSolved, solution))
  }
}

export default connect(mapState, mapDispatch)(SingleProblem)
