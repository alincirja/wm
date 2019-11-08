import React, { useState } from "react";
import { firestore } from "../../base";

const Form = () => {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");

    const formSubmit = e => {
        e.preventDefault();

        if (title.trim() === "" || (price === "" || isNaN(price))) {
            alert("Ambele campuri sunt necesare");
        } else {
            firestore.collection("costs").add({title, price}).then(docRef => {
                setTitle("");
                setPrice("");
            }).catch(err => {
                alert("Eroare: " + err.message);
                console.log(err);
            });
        }
    };

    return (
        <form onSubmit={formSubmit} className="budget-form">
            <div className="group">
            <input type="text" name="title" id="title" value={title} onChange={e => setTitle(e.target.value)} required={true}/>
                <label htmlFor="title">Titlu</label>
            </div>
            <div className="group">
                <input type="number" step="0.1" name="price" id="price" value={price} onChange={e => setPrice(e.target.value)} required={true}/>
                <label htmlFor="price">Pret</label>
            </div>
            <button type="submit">+</button>
        </form>
    );
};

export default Form;