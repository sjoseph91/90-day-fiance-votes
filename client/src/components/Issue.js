import React from 'react'
import Comments from "./Comments"
import LikesComponent from "./LikesComponent"
export default function Issue(props){
  const { title, description, imgUrl, _id, likes } = props
  return (
    <div className="issue-container">
      <div className="issue">
        <div className="container">
          <img src={imgUrl} alt="issue" width={150} />
        </div>
        <div className="text">
          <h2>{ title }</h2>
          <p>{ description }</p>
        </div>
        <LikesComponent issueId={_id} likes={likes}/>
      
      </div>
      <div className="comments">
        <Comments issueId ={_id}/>
      </div>

    </div>

    
    
  )
}