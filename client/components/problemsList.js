import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getAllProblems, clearSingleProblem} from '../store/problems'
import {Link} from 'react-router-dom'

// Until we have a CSS file
const styles = {
  listItem: {display: 'flex'}
}
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
      <div className="problemListContainer">
        {this.props.problems.map(el => {
          return (
            <div
              key={el.id}
              className="problemListItem"
              style={styles.listItem}
            >
              <Link
                to={{
                  pathname: `/problems/${el.id}`
                }}
              >
                <h6>{el.name}</h6>
              </Link>
              <h6>{el.category}</h6>
              <h6>Difficulty: {el.points < 50 ? 'Easy' : 'Medium'}</h6>
              <hr />
            </div>
          )
        })}
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
