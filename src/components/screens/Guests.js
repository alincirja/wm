import React, { useState, useContext, useEffect } from "react";
import Header from "../common/Header";
import AddNew from "../guest/AddNew";
import { GuestContext } from "../../context/Guest";
import Guest from "../guest/Guest";
import Menu from "../guest/Menu";
import Filter from "../guest/Filter";

const Guests = props => {
    const { guests } = useContext(GuestContext);
    const [showAddForm, setShowAddForm] = useState(false);
    const [guestsToShow, setGuestsToShow] = useState(guests);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedGuest, setSelectedGuest] = useState(null);
    const [filterCriteria, setFilterCriteria] = useState("all");

    useEffect(() => {
        if (guests.length) {
            const filtered = guests.filter(guest => {
                return (
                    (guest.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
                    (filterCriteria === "all" ? true : guest.rsvp === filterCriteria)
                );
            })
            setGuestsToShow(filtered);
        } else {
            setGuestsToShow([]);
        }
    }, [guests, searchTerm, filterCriteria]);

    return (
        <div className="container container-guests">
            <Header screenTitle="Invitati" />
            <div className="actions">
                <input type="search" onChange={e => setSearchTerm(e.target.value)} placeholder="Nume sau telefon" />
                <button onClick={() => setShowAddForm(true)}>+ Invitat</button>
            </div>

            <div className="guest-list">
                {guestsToShow.length ? guestsToShow
                    .map(guest => <Guest
                                    key={guest.key}
                                    setSelectedGuest={setSelectedGuest}
                                    guest={guest} /> ) : (
                                        "No guests to show"
                                    )}
            </div>

            <Filter
                filterCriteria={filterCriteria}
                setFilterCriteria={setFilterCriteria}
            />

            <Menu selectedGuest={selectedGuest} setSelectedGuest={setSelectedGuest} />
            <AddNew show={showAddForm} setShow={setShowAddForm} />
        </div>
    );
};

export default Guests;