import React from "react";

import {HashRouter as Router, Navigate, Route, Routes} from "react-router-dom";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Navigation from "components/Navigation";
import Profile from "routes/Profile";

const AppRouter = ({isLoggedIn, userObj}) => {
    return (
        <Router>
            {isLoggedIn && <Navigation/>}
            <Routes>
                {isLoggedIn ?(
                <>
                <Route path="/" element={<Home userObj={userObj}/>}></Route>
                <Route path="/profile" element={<Profile/>}></Route>
                <Route path="*" element={<Navigate replace to="/"/>} />
                </> 
            ): (
                <>
                <Route path="/" element={<Auth/>}></Route>
                <Route path="*" element={<Navigate replace to="/"/>} />
                </>
            )}
            </Routes>
        </Router>
    );
};

export default AppRouter;