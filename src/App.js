import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./components/auth/Login";
import SignUp from './components/auth/SignUp';
import { AuthProvider } from './context/Auth';
import { GuestProvider } from './context/Guest';
import PrivateRoute from "./components/PrivateRoute";
import { isInitialized } from "./base";
import Spinner from './components/ui/Spinner';
import Dashboard from './components/screens/Dashboard';
import Guests from './components/screens/Guests';
import Todos from './components/screens/Todos';
import MyProfile from './components/screens/MyProfile';
import Admin from './components/screens/Admin';

const App = () => {
    const [fireInit, setFireInit] = useState(false);
    useEffect(() => {
        isInitialized().then(() => {
            setFireInit(true);
        })
    }, []);

    return (fireInit ?
        <div className="app-container">
            <AuthProvider>
                <Router>
                    <GuestProvider>
                        <PrivateRoute exact path="/" component={Dashboard} />
                        <PrivateRoute exact path="/guests" component={Guests} />
                    </GuestProvider>
                    <PrivateRoute exact path="/todo" component={Todos} />
                    <PrivateRoute exact path="/profile" component={MyProfile} />
                    <PrivateRoute exact path="/admin" component={Admin} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/signup" component={SignUp} />
                </Router>
            </AuthProvider>
        </div> : (
            <Spinner />
        )
    );
};

export default App;
