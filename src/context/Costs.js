import React, { useState, useEffect } from "react";
import { firestore } from "../base";

export const CostsContext = React.createContext();

export const CostsProvider = ({ children }) => {
    const [costs, setCosts] = useState([]);

    useEffect(() => {
        firestore.collection("costs").onSnapshot(snap => {
            if (snap.docs.length) {
                const costsArray = [];
                snap.forEach(doc => {
                    costsArray.push({key: doc.id, ...doc.data()});
                })
                setCosts(costsArray);
            } else {
                setCosts([]);
            }
        })
    }, []);

    return (
        <CostsContext.Provider
            value={{
                costs
            }}
        >
            { children }
        </CostsContext.Provider>
    );
};