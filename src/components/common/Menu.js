import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { screens } from "../../constants";

import { AuthContext } from "../../context/Auth";

const menuList = Object.values(screens);

const Menu = props => {
    const { currentUser } = useContext(AuthContext);

    return (
        <nav className={`app-nav ${props.show ? "show" : ""}`}>
            <div className="nav-container">
                <Link to="/profile">
                    <div className="user">
                        <div className="image">
                            <img src={currentUser.photoURL} alt=""/>
                        </div>
                        <div className="info">
                            <div className="name">{currentUser.displayName || "Stefana Lupu"}</div>
                            <div className="email">{currentUser.email}</div>
                        </div>
                    </div>
                </Link>

                <ul className="nav-list">
                    {menuList.map((item, index) => (
                        <li key={index}>
                            <NavLink exact to={item.slug}>
                                {item.title}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="nav-overlay" onClick={() => props.setShow(false)}></div>
        </nav>
    );
};

export default Menu;