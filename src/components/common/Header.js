import React, { useState, useContext } from "react";
import firebase from "../../base";
import Menu from "./Menu";
import { AuthContext } from "../../context/Auth";

const Header = props => {
    const [showMenu, setShowMenu] = useState(false);
    const { currentUser } = useContext(AuthContext);

    return (
        <React.Fragment>
            <header className="app-header">
                <div className="app-header_container">
                    <div className="menu-trigger">
                        <button onClick={() => setShowMenu(true)}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                    </div>

                    <div className="screen-title">
                        <h5>{props.screenTitle}</h5>
                    </div>

                    <div className="logout-button">
                        <button className="logout" onClick={() => firebase.auth().signOut()}>
                            Iesire
                        </button>
                    </div>
                </div>
            </header>
            <Menu show={showMenu} setShow={setShowMenu} user={currentUser} />
        </React.Fragment>
    );
};

export default Header;