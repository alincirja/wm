import React from "react";
import firebase from "../../base";

const Header = props => {

    return (
        <header className="app-header">
            <div className="app-header_container">
                <div className="menu-trigger">
                    <button onClick={() => props.setShowMenu(true)}>
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
    );
};

export default Header;