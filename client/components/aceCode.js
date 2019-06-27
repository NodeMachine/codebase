import React from 'react'
import AceEditor from 'react-ace'

class AceCode extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      code: ''
    }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(newValue) {
    this.setState({code: newValue})
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
        <button
          onClick={() => {
            console.log(this.state)
          }}
        >
          Run code
        </button>
      </div>
    )
  }
}

export default AceCode
