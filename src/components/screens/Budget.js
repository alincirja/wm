import React, { useState, useContext } from "react";
import ScreenDecorator from "./ScreenDecorator";
import Form from "../budget/Form";
import { CostsContext } from "../../context/Costs";
import { firestore } from "../../base";

const Budget = props => {
    const { costs } = useContext(CostsContext);
    const [initialAmount, setInitialAmount] = useState(parseFloat(75000).toFixed(2));
    const totalCosts = parseFloat(costs.map(cost => parseFloat(cost.price)).reduce((prev, next) => prev + next)).toFixed(2);

    const deleteCost = key => {
        const confirmed = window.confirm("Sunteti sigur ca doriti stergerea costului?");

        if (!confirmed || !key) {
            return;
        } else {
            firestore.collection("costs").doc(key).delete().then(() => {
                return;
            }).catch(err => {
                alert(err.message);
                console.log(err);
            });
        }
    };

    return (
        <ScreenDecorator>
            <div className="balance">
                <div className="amount">{initialAmount - totalCosts} <sub>RON</sub></div>
                <div className="label">Balanta NET</div>
            </div>

            <ul className="amounts">
                <li className="initial">
                    <div className="amount">{initialAmount} <sub>RON</sub></div>
                    <div className="label">Suma alocata</div>
                </li>
                <li className="expenses">
                    <div className="amount">{totalCosts} <sub>RON</sub></div>
                    <div className="label">Cheltuieli</div>
                </li>
            </ul>

            <Form />

            {costs.length ? <ul className="costs-list">
                {costs.map(cost => <li key={cost.key}>
                    <span className="title">{cost.title}</span>
                    <span className="price">{cost.price} <sup>RON</sup></span>
                    <button className="delete" onClick={() => deleteCost(cost.key)}>Sterge</button>
                </li>)}
            </ul> : "Nu ati adaugat nicio cheltuiala"}
        </ScreenDecorator>
    );
};

export default Budget;