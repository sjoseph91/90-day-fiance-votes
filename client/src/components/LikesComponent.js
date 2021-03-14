import React, { useContext, useState }from 'react';
import { IssueContext} from "../context/IssueProvider"

function LikesComponent(props){
    const {sendUpvote, sendDownVote} = useContext(IssueContext);
    const {likes, issueId} = props;
    const [currentVotes, setCurrentVotes] = useState(likes || 0)
    const [errMessage, setErrMessage] = useState("");

   function handleVoteReponse(response){
        if (typeof response === 'string'){
            setErrMessage(response);
        }
        else{
            setCurrentVotes(response);
            setErrMessage("")
        }
   }

    function upvote(e){
        e.preventDefault()
        sendUpvote(issueId, handleVoteReponse)
    }
    function downvote(e){

        e.preventDefault();
        sendDownVote(issueId, handleVoteReponse);
        
    }
    return (
        <div className="likes">
            <button onClick={upvote}>Upvote</button>
            <button onClick={downvote}>Downvote</button>
            <br></br>
            <h4>Likes: {currentVotes}</h4>
            {errMessage}

        </div>
    )
}
export default LikesComponent;