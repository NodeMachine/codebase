import React, {Component} from 'react'
import AceEditor from 'react-ace'
import ProblemDescription from './problemDescription'
import axios from 'axios'
import {connect} from 'react-redux'
import {getSingleProblem} from '../store/problems'
import {saveSolution} from '../store/user'
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
    this.handleReset = this.handleReset.bind(this)
  }

  componentDidMount() {
    this.props.getSingleProblem(this.props.match.params.id)
  }

  componentDidUpdate() {
    if (!this.state.code) {
      if (this.props.user && this.props.user.problems) {
        for (let i = 0; i < this.props.user.problems.length; i++) {
          if (
            this.props.user.problems[i].id === this.this.props.problem[0].id
          ) {
            this.setState({
              code: this.props.user.problems[i].solution || 'NO CODE DEFINED'
            })
            break
          }
        }
      } else {
        this.setState({
          code: this.props.problem[0].defaultCode || 'NO CODE DEFINED'
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
        `/api/solution/${this.props.problem[0].id}`,
        this.state
      )
      if (this.props.user) {
        const problem = this.props.problem[0]
        const userId = this.props.user.id
        const isSolved = data.every(val => val === 'true')
        const solution = this.state.code
        this.props.saveSolution(problem, userId, isSolved, solution)
      }
    } catch (error) {
      console.error("Something went wrong submitting user's code", error)
    }
    // await axios
    //   .post(`/api/solution/${this.props.problem[0].id}`, this.state)
    //   .then(returnResult => {
    //     this.setState({result: returnResult.data})
    //   })
    //   .catch(err => console.log(err))
  }

  handleReset() {
    this.setState({code: this.props.problem[0].defaultCode})
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
        <button onClick={() => this.handleReset()}>Reset code</button>
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
    problem: state.problems,
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
