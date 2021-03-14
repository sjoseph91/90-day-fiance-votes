import React, { useContext } from 'react'
import IssueForm from "./IssueForm"
import { UserContext } from '../context/UserProvider.js'
import { IssueContext } from "../context/IssueProvider"

function AddNewIssue(props){

    const {
        user: {username, _id}
    } = useContext(UserContext)

    const {addIssue} = useContext(IssueContext)


    return (
        <div className="addNewPost">
            <h1>Add new Post for @{username}</h1>
            <IssueForm 
            username={username}
            userid={_id}
            addIssue={addIssue}
            />
        </div>
    )
}

export default AddNewIssue;