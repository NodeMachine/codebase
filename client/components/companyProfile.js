import React, {Component} from 'react'
import connect from 'react-redux'

class CompanyProfile extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return <div>companyProfile</div>
  }
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {}

export default connect(mapStateToProps, mapDispatchToProps)(CompanyProfile)
