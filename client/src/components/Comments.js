import React, {useState, useContext, useEffect }from 'react';
import { IssueContext } from "../context/IssueProvider"

function Comments(props){
    const {issueId} = props
    
    const [newComment, setNewComment] = useState("");
    const [comments, setComments] = useState([]);
    const {addComment, getCommentsById,  } = useContext(IssueContext)

    useEffect(() => {
        setComments(getCommentsById(issueId));
    }, [])

    function handleChange(e){
        e.preventDefault();
        const {value} = e.target;
        setNewComment(value)
    }
    function changeCommentState(newComment){
        setComments(prevComments => [...prevComments, newComment])
    }
    function handleSubmit(e){
        e.preventDefault();
        const submitPackage = {
            text: newComment,
            issue: issueId
        };
        addComment(submitPackage, changeCommentState)
        setNewComment("");
        
    }
  
    
    return (
        <>
        
        <form id="add-comment-form" onSubmit={handleSubmit}>
            <input 
                type="text"
                name="newComment"
                value={newComment}
                onChange={handleChange}
                placeholder="Leave a comment"
            />
            <div>
                <button type="submit">Comment</button>
            </div>
            
        </form>
        
        {comments && comments.map(comment => (
            <div className="comment" key={comment._id}>
                <p><strong>@{comment.authorName}: </strong>{comment.text} </p>
            </div>
        ))}
        
        </>
    )

}

export default Comments;