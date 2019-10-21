import React, { useState, useEffect } from "react";
import { firestore } from "../base";

export const GuestContext = React.createContext();

export const GuestProvider = ({ children }) => {
    const [guests, setGuests] = useState([]);

    useEffect(() => {
        firestore.collection("guests").onSnapshot(snap => {
            if (snap.docs.length) {
                const guestsArray = [];
                snap.forEach(doc => {
                    guestsArray.push({key: doc.id, ...doc.data()});
                })
                setGuests(guestsArray);
            } else {
                setGuests([]);
            }
        })
    }, []);

    return (
        <GuestContext.Provider
            value={{
                guests
            }}
        >
            { children }
        </GuestContext.Provider>
    );
};