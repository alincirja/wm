import React, { useContext } from "react";
import app from "./base";
import { AuthContext } from "./context/Auth";
import Spinner from "./components/ui/Spinner";

const TempHome = () => {
    const { currentUser } = useContext(AuthContext);
    let content = <Spinner />;
    if (currentUser) {
        content = (
            <React.Fragment>
                <h5>TempHome</h5>
                <button onClick={() => app.auth().signOut()}>Logout</button>
            </React.Fragment>
        );
    }
    return content;
};

export default TempHome;