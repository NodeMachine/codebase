import React, {Component} from 'react'
import {connect} from 'react-redux'
import './userProfile.css'
import {updateCompany} from '../store/company'
import {MdModeEdit} from 'react-icons/md'

class CompanyInformation extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleEdit = this.handleEdit.bind(this)
    this.state = {
      editMode: false,
      companyInfo: '',
      companyIndustry: ''
    }
  }

  handleEdit(event) {
    event.preventDefault()
    const company = this.props.company
    this.setState({
      companyInfo: company.companyInfo || '',
      companyIndustry: company.companyIndustry || '',
      editMode: true
    })
  }

  handleChange(event) {
    event.preventDefault()
    this.setState({[event.target.name]: event.target.value})
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.update(this.props.company.id, this.state)
    this.setState({editMode: false})
  }

  render() {
    const company = this.props.company
    if (this.state.editMode) {
      return (
        <form className="profile-description-form" onSubmit={this.handleSubmit}>
          <div>
            <h5>Information:</h5>
            <input
              type="text"
              name="companyInfo"
              onChange={this.handleChange}
              placeholder={this.state.companyInfo}
            />
          </div>
          <div>
            <h5>Industry:</h5>
            <input
              type="text"
              name="companyIndustry"
              onChange={this.handleChange}
              placeholder={this.state.companyIndustry}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      )
    } else {
      return (
        <div className="profile-description">
          <div id="text-box">
            <div>
              <h5>Information: </h5>
              <p>{company.companyInfo || "Add your company's information."}</p>
            </div>
            <div>
              <h5>Industry: </h5>
              <p>
                {company.companyIndustry || "Add your company's information."}
              </p>
            </div>
          </div>
          <div>
            <MdModeEdit onClick={this.handleEdit} />
          </div>
        </div>
      )
    }
  }
}

const mapStateToProps = state => ({
  company: state.company.company
})

const mapDispatchToProps = dispatch => ({
  update: (id, obj) => dispatch(updateCompany(id, obj))
})

export default connect(mapStateToProps, mapDispatchToProps)(CompanyInformation)
