import React, { useCallback } from "react";
import { withRouter } from "react-router-dom";
import validator from "validator";
import firebase from "../../base";

const SignUp = ({ history }) => {
    const handleSignUp = useCallback(async event => {
        event.preventDefault();
        const { email, password, confirm_password } = event.target.elements;

        if (!validator.isEmail(email.value)) {
            alert("Adresa de email nu este corecta");
        } else {
            if (password.value !== confirm_password.value) {
                alert("Parola confirmata nu corespunde cu cea setata");
            } else {
                try {
                    await firebase
                        .auth()
                        .createUserWithEmailAndPassword(email.value, password.value);
                    history.push("/");
                } catch (error) {
                    alert(error);
                }
            }
        }
    }, [history]);

    return (
        <form onSubmit={handleSignUp}>
            <h5>Sign Up</h5>
            <input type="email" placeholder="email" name="email" />
            <input type="password" placeholder="password" name="password" />
            <input type="password" placeholder="confirm password" name="confirm_password" />
            <button type="submit">Sign Up</button>
        </form>
    );
};

export default withRouter(SignUp);