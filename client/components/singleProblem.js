import React, {Component} from 'react'
import AceCode from './acecode'
import ProblemDescription from './problemDescription'

class SingleProblem extends Component {
  render() {
    return (
      <div style={style.outerDiv}>
        <AceCode />
        <ProblemDescription />
        {/* <ResultWindow /> */}
      </div>
    )
  }
}

const style = {
  outerDiv: {
    display: 'flex'
  }
}

export default SingleProblem
