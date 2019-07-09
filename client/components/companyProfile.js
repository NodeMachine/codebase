import React from 'react'
import connect from 'react-redux'
import CompanyProblemsList from './companyProblemsList'
import CompanySavedUsersList from './companySavedUsersList'
import CompanyProblemForm from './companyProblemForm'
import ComapnyInformation from './companyInformation'
import {Redirect} from 'react-router-dom'
import './userProfile.css'

const CompanyProfile = props => {
  const company = props.company
  if (!company.id) {
    return <Redirect to="/" />
  }

  return (
    <div className="user-profile-container">
      <div className="profile-left">
        <hr />
        <div className="profile-main-info">
          <h1>{company.name}</h1>
        </div>
        <div>
          <ComapnyInformation />
        </div>
        <div>
          <CompanyProblemForm />
        </div>
      </div>
      <div className="profile-right">
        <hr />
        <h2>Saved Users</h2>
        <hr />
        {company.savedUsers.length ? (
          <CompanySavedUsersList />
        ) : (
          <h4>No saved useres yet!</h4>
        )}
        <hr />
        <h2>Custom Problems</h2>
        <hr />
        {company.customProblems.length ? (
          <CompanyProblemsList />
        ) : (
          <h4>No problems submitted yet.</h4>
        )}
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  company: state.company.company
})

export default connect(mapStateToProps)(CompanyProfile)
