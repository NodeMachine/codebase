import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getAllProblems, clearSingleProblem} from '../store/problems'
import {Link} from 'react-router-dom'
import './problemList.css'

class ProblemList extends Component {
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
            <div className="problem-list-item">
              <h3>Problem Name</h3>
            </div>
            <div className="problem-list-item">
              <h3>Category</h3>
            </div>
            <div className="problem-list-item">
              <h3>Difficulty</h3>
            </div>
            <div className="problem-list-item">
              <h3>Points</h3>
            </div>
          </div>
          <hr />
          {this.props.problems.map(el => {
            return (
              <div key={el.id}>
                <div className="problem-list-item-container">
                  <div className="problem-list-item">
                    <Link
                      to={{
                        pathname: `/problems/${el.id}`
                      }}
                    >
                      <h4>{el.name}</h4>
                    </Link>
                  </div>
                  <div className="problem-list-item">
                    <h4>{el.category}</h4>
                  </div>
                  <div className="problem-list-item">
                    <h4>{el.points < 50 ? 'Easy' : 'Medium'}</h4>
                  </div>
                  <div className="problem-list-item">
                    <h4>{el.points}</h4>
                  </div>
                </div>
                <hr />
              </div>
            )
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

export default connect(mapState, mapDispatch)(ProblemList)
