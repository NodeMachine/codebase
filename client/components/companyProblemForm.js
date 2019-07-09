import React from 'react'
import {connect} from 'react-redux'
import {addCustomProblem} from '../store/company'

class CompanyProblemForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      typeOf: '',
      prompt: '',
      name: '',
      input1: '',
      output1: '',
      input2: '',
      output2: '',
      input3: '',
      output3: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSumbit = this.handleSumbit.bind(this)
  }

  handleChange(evt) {
    this.setState({[evt.target.name]: evt.target.value})
  }

  handleSumbit(evt) {
    evt.preventDefault()
    let {
      typeOf,
      prompt,
      name,
      input1,
      output1,
      input2,
      output2,
      input3,
      output3
    } = this.state
    let problem = {name, prompt}
    let functionName = name.toLowerCase().replace(/[^A-Z0-9]/gi, '')
    problem.defaultCode = `function ${functionName}(){\n  return\n}`
    problem.test = []
    problem.test.push(`typeof ${functionName}(${input1})`)
    problem.test.push(typeOf)
    problem.test.push(`${functionName}(${input1})`)
    problem.test.push(output1)
    problem.test.push(`${functionName}(${input2})`)
    problem.test.push(output2)
    problem.test.push(`${functionName}(${input3})`)
    problem.test.push(output3)

    this.props.addProblem(this.props.id, problem)

    this.setState({
      typeOf: '',
      prompt: '',
      name: '',
      input1: '',
      output1: '',
      input2: '',
      output2: '',
      input3: '',
      output3: ''
    })
  }

  render() {
    return (
      <form onSubmit={this.handleSumbit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            onChange={this.handleChange}
            value={this.state.name}
          />
        </div>
        <div>
          <label htmlFor="prompt">Prompt:</label>
          <input
            type="text"
            name="prompt"
            onChange={this.handleChange}
            value={this.state.prompt}
          />
        </div>
        <div>
          <label htmlFor="typeOf">Expected output data type:</label>
          <input
            type="text"
            name="typeOf"
            onChange={this.handleChange}
            value={this.state.typeOf}
          />
        </div>
        <div>
          <h3>Test One:</h3>
          <label htmlFor="input1">Input:</label>
          <input
            type="text"
            name="input1"
            onChange={this.handleChange}
            value={this.state.input1}
          />
          <label htmlFor="output1">Expected output:</label>
          <input
            type="text"
            name="output1"
            onChange={this.handleChange}
            value={this.state.output1}
          />
        </div>
        <div>
          <h3>Test Two:</h3>
          <label htmlFor="input2">Input:</label>
          <input
            type="text"
            name="input2"
            onChange={this.handleChange}
            value={this.state.input2}
          />
          <label htmlFor="output2">Expected output:</label>
          <input
            type="text"
            name="output2"
            onChange={this.handleChange}
            value={this.state.output2}
          />
        </div>
        <div>
          <h3>Test Three:</h3>
          <label htmlFor="input3">Input:</label>
          <input
            type="text"
            name="input3"
            onChange={this.handleChange}
            value={this.state.input3}
          />
          <label htmlFor="output3">Expected output:</label>
          <input
            type="text"
            name="output3"
            onChange={this.handleChange}
            value={this.state.output3}
          />
        </div>
      </form>
    )
  }
}

const mapStateToProps = state => ({
  id: state.company.company.id
})

const mapDistpatchToProps = dispatch => ({
  addProblem: (companyId, problem) =>
    dispatch(addCustomProblem(companyId, problem))
})

export default connect(mapStateToProps, mapDistpatchToProps)(CompanyProblemForm)
