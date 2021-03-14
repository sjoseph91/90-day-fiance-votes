import React, { useState } from 'react';
import axios from 'axios';

export const IssueContext = React.createContext();

const userAxios = axios.create()

userAxios.interceptors.request.use(config => {
  const token = localStorage.getItem("token")
  config.headers.Authorization = `Bearer ${token}`
  return config
})



export default function IssueProvider(props){
    const [issues, setIssues] = useState([]);
    const [ userIssues, setUserIssues ] = useState([]);
    const [comments, setComments] = useState([]);
    


    function getIssues(){
        userAxios.get("/api/issue/")
            .then(res => setIssues(res.data))
            .catch(err => console.dir(err.response.data.errMsg))
    }

    function getUserIssues(){
        userAxios.get("/api/issue/userissues")
            .then(res => setUserIssues(res.data))
            .catch(err => console.log(err));
    }

    const addComment = (newComment, fn) => {
        userAxios.post("/api/issue/comment", newComment)
            .then(res => {
                setComments(prevComments => ([...prevComments, res.data]))
                fn(res.data)
            })
            .catch(err => console.log(err))

            
    }

    function getComments(){
        userAxios.get("/api/issue/comment")
            .then(res => setComments(res.data))
            .catch(err => console.log(err))
    }

    function addIssue(newIssue){
        userAxios.post('/api/issue', newIssue)
        .then(res => {
            res = setIssues(prevIssues => [...prevIssues, res.data])
        })
        .catch(err => console.dir(err))   
    }

    function getCommentsById(id){
        let result = comments.filter(comment => comment.issue === id);
        
        return result;
    }
    function incrementIssueLikes(num, issueId, callback){
        userAxios.put(`/api/issue/${issueId}`, {incAmount: num} )
            .then(res => callback(res.data))
            .catch(err => console.log(err));
    }
    function updateUserLikes(issueId){
        userAxios.put("/api/user/upvote/" + issueId)
            .then(res => {
                return
            })
            .catch(err => console.log(err));
    }
    function updateUserDislikes(issueId){
        userAxios.put("/api/user/downvote/" + issueId)
            .then(res => {
                console.log(res);
            })
            .catch(err => console.log(err));
    }
    
    function sendUpvote(issueId, callback){
        userAxios.get("/api/user")
            .then(res => {
                if (res.data.likedIssues.includes(issueId)){
                    callback("You have already liked this issue")
                    return false;
                }
                return true
                
            })
            .then(res => {
                if (res){
                    incrementIssueLikes( 1, issueId, callback)
                    updateUserLikes(issueId)
                }
            })
            .catch(err => console.log(err))
    }

    function sendDownVote(issueId, callback){
        userAxios.get("/api/user/")
            .then(res => {
                if (res.data.dislikedIssues.includes(issueId)){
                    callback("You have already downvoted this issue")
                    return false;
                }
                return true
                
            })
            .then(res => {
                if (res){
                    incrementIssueLikes( -1, issueId, callback)
                    updateUserDislikes(issueId)
                }
            })
            .catch(err => console.log(err))
    }
    

    return (
        <IssueContext.Provider value={
            {
                issues,
                getIssues,
                getUserIssues,
                userIssues,
                addIssue,
                addComment,
                getComments,
                getCommentsById,
                sendUpvote,
                sendDownVote
                

            }
        }>
            {props.children}
        </IssueContext.Provider>
    )
}




//We need token to make requests
//need a get all issues call
//need a create issue call