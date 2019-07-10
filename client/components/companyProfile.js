import React from 'react'
import {connect} from 'react-redux'
import CompanyProblemsList from './companyProblemsList'
import CompanySavedUsersList from './companySavedUsersList'
import CompanyProblemForm from './companyProblemForm'
import CompanyInformation from './companyInformation'
import {Redirect} from 'react-router-dom'
import './companyProfile.css'

const CompanyProfile = props => {
  const company = props.company
  if (!company.id) {
    return <Redirect to="/" />
  }

  return (
    <div className="company-profile-container">
      <div className="profile-left">
        <hr />
        <div className="profile-main-info">
          <h1>{company.companyName}</h1>
        </div>
        <div>
          <CompanyInformation />
        </div>
        <div>
          <hr />
          <h2>Saved Users</h2>
          <hr />
          {company.savedUsers.length ? (
            <CompanySavedUsersList users={company.savedUsers} />
          ) : (
            <h4>No saved useres yet!</h4>
          )}
        </div>
      </div>
      <div className="profile-right">
        <hr />
        <h2>Saved Users</h2>
        <hr />
        {company.savedUsers.length ? (
          <CompanySavedUsersList />
        ) : (
          <h4>No saved users yet!</h4>
        )}
        <hr />
        <h2>Custom Problems</h2>
        <hr />
        {company.customProblems && company.customProblems.length ? (
          <CompanyProblemsList />
        ) : (
          <h4>No problems submitted yet.</h4>
        )}
        <div>
          <hr />
          <h2>Create Custom Problem</h2>
          <hr />
          <CompanyProblemForm />
        </div>
      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  company: state.company.company
})

export default connect(mapStateToProps)(CompanyProfile)
