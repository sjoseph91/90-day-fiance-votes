import React, { useEffect, useContext } from 'react'
import IssueList from "./IssueList"
import { IssueContext } from "../context/IssueProvider"

function Profile(){
    const {userIssues, getUserIssues} = useContext(IssueContext);

    useEffect(() => getUserIssues(), [])

    return (
        <div className="profile">
            <h1>My Posts</h1>
            <IssueList issues={userIssues} />
        </div>
    )
}

export default Profile;