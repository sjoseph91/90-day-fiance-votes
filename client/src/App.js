import React, { useContext } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import Navbar from "./components/Navbar";
import Auth from "./components/Auth";
import HomePage from "./components/Homepage";
import Profile from "./components/Profile";
import AddNewIssue from "./components/AddNewIssue";
import ProtectedRoute from "./components/ProtectedRoute"
import { UserContext } from './context/UserProvider.js'
import IssueProvider from "./context/IssueProvider"

function App(){
    const { token, logout } = useContext(UserContext);
    return (
        <IssueProvider>
            <div className="app">
                { token && <Navbar logout={ logout }/> }
                <Switch>
                    <Route 
                    exact path="/" 
                    render={()=> token ? <Redirect to="/homepage"/> : <Auth />}
                    />
                    <ProtectedRoute 
                    path="/homepage"
                    component={HomePage}
                    redirectTo="/"
                    token={token}
                    />
                    <ProtectedRoute 
                    path="/newpost"
                    component={AddNewIssue}
                    redirectTo="/"
                    token={token}
                    />
                    <ProtectedRoute 
                    path="/profile"
                    component={Profile}
                    redirectTo="/"
                    token={token}
                    />
                </Switch>
            </div>
        </IssueProvider>
        
    )
}

export default App;