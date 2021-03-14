import React from 'react'
import Issue from './Issue.js'

export default function IssueList(props){
  const {issues} = props;

  
  return (
    <div className="IssueList">
      {issues ?  issues.map(issue => <Issue {...issue} key={issue._id }/>) : <h1>You haven't posted any issues</h1>}
    </div>
  )
}