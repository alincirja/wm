import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router-dom";
import validator from "validator";
import firebase from "../../base";
import { AuthContext } from "../../context/Auth";
import logo from "../../assets/logo.png";
import * as appConstants from "../../constants";

const Login = ({ history }) => {

    const handleLogin = useCallback(async event => {
        event.preventDefault();
        const { email, password } = event.target.elements;
        if (validator.isEmail(email.value)) {
            try {
                await firebase
                    .auth()
                    .signInWithEmailAndPassword(email.value, password.value);
                history.push("/");
            } catch (error) {
                alert(error);
            }
        }
    }, [history]);

    const { currentUser } = useContext(AuthContext);
    if (currentUser) {
        return <Redirect to="/" />;
    }

    return (
        <form onSubmit={handleLogin} className="auth-form">
            <div className="logo">
                <img src={logo} alt={appConstants.appTitle} title={appConstants.appTitle} />
            </div>
            <input type="email" name="email" placeholder="email" />
            <input type="password" name="password" placeholder="password" />
            <button type="submit">Login</button>
        </form>
    );
};

export default withRouter(Login);