import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar(props){
  const { logout } = props
  return (
    <div className="navbar">
      <Link to="/homepage">Home Page</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/newpost">Add New Issue</Link>
      
      <button onClick={logout}>Logout</button>
    </div>
  )
}