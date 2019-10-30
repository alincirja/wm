import React, { useState, useEffect } from "react";
import * as appConstants from "../../constants";
import { firestore } from "../../base";

const blankGuest = {
    name: "",
    phone: "",
    personsCount: "",
    rsvp: "",
    comment: "",
    money: 0
};

const Form = props => {
    const { selectedGuest } = props;
    const [newGuest, setNewGuest] = useState(blankGuest);

    useEffect(() => {
        if (selectedGuest) {
            const {key, ...guest} = selectedGuest;
            setNewGuest(guest);
        } else {
            setNewGuest(blankGuest);
        }
    }, [selectedGuest]);

    const handleChange = e => {
        e.persist();
        setNewGuest(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    };

    const handleSubmit = e => {
        e.preventDefault();
        if (newGuest.name.trim() === "") {
            alert("Numele este necesar");
        } else {
            if (selectedGuest) {
                firestore.collection("guests").doc(selectedGuest.key).set(newGuest).then(() => {
                    props.setSelectedGuest(null);
                    props.setShow(false);
                }).catch(err => {
                    alert(err.message);
                    console.log(err);
                });
            } else {
                firestore.collection("guests").add(newGuest).then(docRef => {
                    setNewGuest(blankGuest);
                }).catch(err => {
                    alert("Eroare: " + err.message);
                    console.log(err);
                })
            }
        }
    }

    return (
        <div className={`add-guest ${props.show && "show"}`}>
            <form className="add-guest-form" onSubmit={handleSubmit}>
                <label>Nume</label>
                <input type="text" name="name" value={newGuest.name} className="fc-guest" placeholder="Nume" onChange={handleChange} />
                <label>Telefon</label>
                <input type="tel" name="phone" value={newGuest.phone} className="fc-guest" placeholder="Telefon" onChange={handleChange} />
                <label>Numar de persoane</label>
                <input type="number" min="0" max="9" name="personsCount" value={newGuest.personsCount} className="fc-guest fc-guest-number" placeholder="Numar de persoane" onChange={handleChange} />
                <label>RSVP</label>
                <select name="rsvp" className="fc-guest" value={newGuest.rsvp} onChange={handleChange}>
                    <option value={appConstants.RSVP_UNSET}>Inv. netrimisa</option>
                    <option value={appConstants.RSVP_SENT}>Inv. trimisa</option>
                    <option value={appConstants.RSVP_ACCEPTED}>Acceptat</option>
                    <option value={appConstants.RSVP_DECLINED}>Neacceptat</option>
                    <option value={appConstants.RSVP_CANCELED}>Anulat</option>
                    <option value={appConstants.RSVP_ARRIVED}>Venit</option>
                </select>
                <label>Comentariu</label>
                <textarea type="text" name="comment" value={newGuest.comment} className="fc-guest" placeholder="Comentariu" onChange={handleChange} />
                <button type="submit">Salvare</button>

                <div className="cancel" onClick={() => props.setShow(false)}>Anulare</div>
            </form>
        </div>
    );
};

export default Form;