import React from "react";
import { NavLink } from "react-router-dom";

const Menu = props => {
    const menuList = [
        {
            link: "/",
            title: "Dashboard"
        },
        {
            link: "/guests",
            title: "Invitati"
        },
        {
            link: "/todo",
            title: "De facut"
        },
        {
            link: "/profile",
            title: "Profil"
        },
        {
            link: "/admin",
            title: "Admin"
        }
    ];

    return (
        <nav className={`app-nav ${props.show && "show"}`}>
            <div className="nav-container">
                <div className="user">
                    <div className="image">
                        <img src={props.user.photoURL} alt=""/>
                    </div>
                    <div className="info">
                        <div className="name">{props.user.displayName || "Stefana Lupu"}</div>
                        <div className="email">{props.user.email}</div>
                    </div>
                </div>

                <ul className="nav-list">
                    {menuList.map((item, index) => (
                        <li key={index}>
                            <NavLink exact to={item.link}>
                                {item.title}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>
            <div className="nav-overlay" onClick={() => props.setShow(false)}></div>
        </nav>
    );
}

export default Menu;