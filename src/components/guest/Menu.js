import React from "react";
import * as appConstants from "../../constants";
import { firestore } from "../../base";

const rsvp = [
    {
        value: appConstants.RSVP_SENT,
        label: "Inv. trimisa"
    },
    {
        value: appConstants.RSVP_ACCEPTED,
        label: "Accept"
    },
    {
        value: appConstants.RSVP_DECLINED,
        label: "Nu accept"
    },
    {
        value: appConstants.RSVP_ARRIVED,
        label: "Venit"
    },
    {
        value: appConstants.RSVP_CANCELED,
        label: "Anulat"
    },
    {
        value: appConstants.RSVP_UNSET,
        label: "Inv. netrimisa"
    }
];

const Menu = props => {

    const updateStatus = e => {
        const newStatus = e.target.value;
        const guestId = props.selectedGuest.key;
        firestore.collection("guests").doc(guestId).set({
            ...props.selectedGuest,
            rsvp: newStatus
        }).then(() => {
            props.setSelectedGuest(null);
        }).catch(err => {
            alert(err.message);
            console.log(err);
        })
    };

    const deleteGuest = () => {
        if (props.selectedGuest !== null) {
            firestore.collection("guests").doc(props.selectedGuest.key).delete().then(() => {
                props.setSelectedGuest(null);
            }).catch(err => {
                alert(err.message);
                console.log(err);
            })
        }
    };

    return (
        <div className={`menu ${props.selectedGuest && "show"}`}>
            <div className="menu-container">
                <h5>RSVP</h5>
                <ul>
                    {props.selectedGuest && rsvp.filter(filtered => filtered.value !== props.selectedGuest.rsvp).map((item, index) => (
                        <li key={index}>
                            <button onClick={updateStatus} value={item.value}>{item.label}</button>
                        </li>
                    ))}
                </ul>

                <div className="more">
                <div className="edit" onClick={() => {}}>Editare</div>
                    <div className="delete" onClick={deleteGuest}>Sterge</div>
                </div>
                <div className="cancel" onClick={() => props.setSelectedGuest(null)}>Inchide</div>
            </div>
        </div>
    );
};

export default Menu;