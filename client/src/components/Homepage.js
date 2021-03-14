import React, { useContext, useEffect} from 'react'
import { IssueContext } from "../context/IssueProvider"
import IssueList from "./IssueList"

function Homepage(){
    const {issues, getIssues, getComments,} = useContext(IssueContext)

    useEffect(() => {
        getIssues()
        getComments()
    }, [])
    
    return (
        <div className="homepage">
            <h1>Most Popular Posts</h1>
            <IssueList issues={issues}/>

        </div>
    )
}

export default Homepage