import react, {Component} from 'react'
import AceCode from './acecode'

class SingleProblem extends Component {
  render() {
    return (
      <div style={style.outerDiv}>
        <AceCode />
        <ProblemDescription />
        <ResultWindow />
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
