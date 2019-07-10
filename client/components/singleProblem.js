import React, {Component} from 'react'
import AceEditor from 'react-ace'
import ProblemDescription from './problemDescription'
import axios from 'axios'
import {connect} from 'react-redux'
import {getSingleProblem} from '../store/problems'
import {saveSolution} from '../store/user'
import {saveSolutionToCustomProblem} from '../store/company'
import ResultWindow from './resultWindow'
import './singleProblem.css'
import 'brace/mode/javascript'
import 'brace/theme/monokai'
import {IconContext} from 'react-icons'
import {IoMdSync} from 'react-icons/io'

class SingleProblem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      code: '',
      result: [],
      loading: false
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleReset = this.handleReset.bind(this)
  }

  componentDidMount() {
    if (this.props.match.params.companyId) {
      this.props.getSingleProblem(
        this.props.match.params.id,
        this.props.match.params.companyId
      )
    } else {
      this.props.getSingleProblem(this.props.match.params.id)
    }
  }

  componentDidUpdate() {
    const problem = this.props.problem
    const user = this.props.user
    if (!this.state.code) {
      if (user.problems && user.problems[problem.id]) {
        this.setState({code: user.problems[problem.id].solution})
      } else if (this.props.problem.defaultCode) {
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
    this.setState({loading: true})
    try {
      const companyId = this.props.match.params.companyId
      let result
      if (!this.props.match.params.companyId) {
        const {data} = await axios.post(
          `/api/solution/${this.props.problem.id}`,
          this.state
        )
        result = data
      } else {
        const {data} = await axios.post(
          `/api/solution/${this.props.problem.id}/${companyId}`,
          this.state
        )
        result = data
      }
      if (this.props.user.id) {
        const problemId = this.props.problem.id
        const problem = this.props.problem
        const userId = this.props.user.id
        const name = this.props.user.firstName + ' ' + this.props.user.lastName
        const isSolved = result.every(test => test.pass === true)
        const solution = this.state.code
        if (companyId) {
          this.props.saveCustomSolution(
            companyId,
            problemId,
            userId,
            name,
            solution,
            isSolved
          )
        } else {
          this.props.saveSolution(problem, userId, isSolved, solution)
        }
      }
      this.setState({loading: false})
      this.setState({result})
    } catch (error) {
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
          <div className="directions">
            <h4>Directions</h4>
            <hr />
            <p>
              Write your code inside the function definition. Please note that
              the function does not need to be invoked.
            </p>
          </div>
          <AceEditor
            mode="javascript"
            theme="monokai"
            onChange={this.handleChange}
            name="UNIQUE_ID_OF_DIV"
            value={this.state.code}
            editorProps={{$blockScrolling: true}}
            height="70vh"
            width="50vw"
          />
          <div className="buttonContainer">
            <button
              id="reset-code-button"
              disabled={this.state.loading}
              type="button"
              onClick={() => this.handleReset()}
            >
              Reset code
            </button>
            <button type="button" onClick={() => this.handleSubmit()}>
              Run code
            </button>
          </div>
        </div>
        <div className="promptResultContainer">
          <ProblemDescription prompt={this.props.problem.prompt} />
          <div>
            <h4>Tests</h4>
            <hr />
            {this.state.loading ? (
              <IconContext.Provider
                value={{
                  className: 'spinnerContainer'
                }}
              >
                <IoMdSync className="spinner" />
              </IconContext.Provider>
            ) : Array.isArray(this.state.result) ? (
              <ResultWindow results={this.state.result} />
            ) : (
              <ResultWindow error={this.state.result} />
            )}
          </div>
        </div>
      </div>
    )
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
    getSingleProblem: (problemId, companyId) =>
      dispatch(getSingleProblem(problemId, companyId)),
    saveSolution: (problem, userId, isSolved, solution) =>
      dispatch(saveSolution(problem, userId, isSolved, solution)),
    saveCustomSolution: (
      companyId,
      problemId,
      userId,
      name,
      solution,
      isSolved
    ) =>
      dispatch(
        saveSolutionToCustomProblem(
          companyId,
          problemId,
          userId,
          name,
          solution,
          isSolved
        )
      )
  }
}

export default connect(mapState, mapDispatch)(SingleProblem)
