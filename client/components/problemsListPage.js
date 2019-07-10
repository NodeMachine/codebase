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
    this.state = {
      filter: [
        'arrays',
        'dynamic programming',
        'strings',
        'sorting',
        'data structures'
      ]
    }
  }

  addFilter = category => {
    if (!this.state.filter.includes(category)) {
      const updatedFilter = this.state.filter.concat(category)
      this.setState({filter: updatedFilter})
    }
  }
  removeFilter = category => {
    const updatedFilter = this.state.filter.filter(el => {
      return el !== category
    })
    this.setState({filter: updatedFilter})
  }

  componentDidMount() {
    this.props.getAllProblems()
    this.props.clearSingleProblem()
  }

  handleClick = evt => {
    if (evt.target.checked) {
      this.addFilter(evt.target.name)
    } else {
      this.removeFilter(evt.target.name)
    }
  }
  render() {
    return (
      <div className="container">
        <div className="filters">
          <h3>Filters: </h3>
          <input
            type="checkbox"
            name="strings"
            onClick={this.handleClick}
            defaultChecked={true}
          />
          <label htmlFor="strings">Strings</label>
          <input
            type="checkbox"
            name="arrays"
            onClick={this.handleClick}
            defaultChecked={true}
          />
          <label htmlFor="arrays">Arrays</label>
          <input
            type="checkbox"
            name="sorting"
            onClick={this.handleClick}
            defaultChecked={true}
          />
          <label htmlFor="sorting">Sorting</label>
          <input
            type="checkbox"
            name="data structures"
            onClick={this.handleClick}
            defaultChecked={true}
          />
          <label htmlFor="data structures">Data Structures</label>
          <input
            type="checkbox"
            name="dynamic programming"
            onClick={this.handleClick}
            defaultChecked={true}
          />
          <label htmlFor="dynamic programming">Dynamic Programming</label>
        </div>
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
              if (!this.state.filter.length) return true
              else return this.state.filter.includes(problem.category)
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
