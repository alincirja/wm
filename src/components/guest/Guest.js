import React from "react";

const Guest = props => {
    const { guest } = props;

    return (
        <div className={`single-guest ${guest.rsvp}`} data-rsvp={guest.rsvp || "UNSENT"}>
            <button className="menu-trigger" onClick={() => props.setSelectedGuest(guest)}>
                <span></span>
                <span></span>
                <span></span>
            </button>
            <div className="info">
                <h5 className="name">{guest.name} <span className="persons-count">#{guest.personsCount}</span></h5>
                <a className="phone" href={`tel:${guest.phone}`}>{guest.phone}</a>
            </div>
        </div>
    );
};

export default Guest;