import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getAllProblems, clearSingleProblem} from '../store/problems'
import {Link} from 'react-router-dom'
import {IconContext} from 'react-icons'
import {MdKeyboardArrowRight} from 'react-icons/md'
import './problemList.css'
import {ProblemListItem} from './problemListItem'

class ProblemListPage extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.getAllProblems()
    this.props.clearSingleProblem()
  }

  render() {
    return (
      <div className="container">
        <div className="problem-list-container">
          <div className="problem-list-title-container">
            <div className="problemName title">
              <h3>Problem Name</h3>
            </div>
            <div className="title">
              <h3>Category</h3>
            </div>
            <div className="title">
              <h3>Difficulty</h3>
            </div>
            <div className="title">
              <h3>Points</h3>
            </div>
            <div id="titleHR">
              <hr />
            </div>
          </div>
          {this.props.problems
            .filter(problem => {
              if (!this.props.filter) return true
              else return problem.category === this.props.filter
            })
            .map(el => {
              return <ProblemListItem problem={el} key={el.id} />
            })}
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    problems: state.problems.allProblems
  }
}

const mapDispatch = dispatch => {
  return {
    getAllProblems: () => dispatch(getAllProblems()),
    clearSingleProblem: () => dispatch(clearSingleProblem())
  }
}

export default connect(mapState, mapDispatch)(ProblemListPage)
