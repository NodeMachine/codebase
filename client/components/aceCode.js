import React from 'react'
import AceEditor from 'react-ace'
import axios from 'axios'

class AceCode extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      code: '',
      result: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(newValue) {
    this.setState({code: newValue})
  }

  handleSubmit() {
    axios
      .post('/api/solution', this.state)
      .then(returnResult => {
        this.setState({result: returnResult.data})
      })
      .catch(err => console.log(err))
  }

  render() {
    return (
      <div>
        <AceEditor
          mode="javascript"
          theme="github"
          onChange={this.handleChange}
          name="UNIQUE_ID_OF_DIV"
          value={this.state.code}
          editorProps={{$blockScrolling: true}}
        />
        <button onClick={() => this.handleSubmit()}>Run code</button>
      </div>
    )
  }
}

export default AceCode
