import React, { useContext } from "react";
import { AuthContext } from "../../context/Auth";

const Details = props => {
    const { currentUser } = useContext(AuthContext);

    const userDetails = [
        {
            label: "Nume",
            value: currentUser.displayName
        },
        {
            label: "Email",
            value: currentUser.email
        }
    ];

    return (
        <React.Fragment>
            <h5>Detalii <button className="toggle-edit" onClick={() => props.setShowForm(true)}>&#9998;</button></h5>
            <ul className="profile-details">
                {userDetails.map((user, index) => {
                    return (
                        <li key={index}>
                            <span className="label">{user.label}: </span>
                            <span className="value">{user.value}</span>
                        </li>
                    );
                })}
            </ul>
        </React.Fragment>
    );
};

export default Details;