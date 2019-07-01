import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getAllProblems} from '../store/problems'

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
  }

  render() {
    return (
      <ul>
        {this.props.problems.map(el => {
          return (
            <li key={el.id} style={styles.listItem}>
              <h6>{el.category}</h6>
              <h6>{el.title}</h6>
              <p>Difficulty: {el.points < 50 ? 'Easy' : 'Medium'}</p>
            </li>
          )
        })}
      </ul>
    )
  }
}

const mapState = state => {
  return {
    problems: state.problems
  }
}

const mapDispatch = dispatch => {
  return {
    getAllProblems: () => dispatch(getAllProblems())
  }
}

export default connect(mapState, mapDispatch)(ProblemList)
