import React, { useContext, useState }from 'react';
import { IssueContext} from "../context/IssueProvider"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-solid-svg-icons'

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
            <h4>Likes: {currentVotes}</h4>
            <div className="icons">
                <i 
                onClick={upvote}
                id="like-button"><FontAwesomeIcon icon={faThumbsUp} /></i>
                <i 
                onClick={downvote}
                id="dislike-button"><FontAwesomeIcon icon={faThumbsDown} /></i>
            </div>
            
            
            
            {errMessage}

        </div>
    )
}
export default LikesComponent;