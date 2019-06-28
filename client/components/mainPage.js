import React, {Component} from 'react'
import ProblemsList from './problemsList'

class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {
      problems: [
        {id: 1, title: 'Sum two digits', points: 80, category: 'arrays'},
        {id: 2, title: 'Return a string', points: 1, category: 'strings'}
      ]
    }
  }

  render() {
    return (
      <div>
        <div id="big-block">
          <h1>Welcome</h1>
        </div>
        <ProblemsList problems={this.state.problems} />
      </div>
    )
  }
}

export default Main
