import React, { useState, useRef } from "react";
import { firestore } from "../../base";

const MoneyForm = props => {
    const [newMoney, setNewMoney] = useState(parseInt(props.guest.money));
    const inputEl = useRef(null);

    const saveMoney = () => {
        if (parseInt(newMoney) === parseInt(props.guest.money) || isNaN(parseInt(newMoney))) {
            setNewMoney(parseInt(props.guest.money));
        } else {
            firestore.collection("guests").doc(props.guest.key).set({
                ...props.guest,
                money: parseInt(newMoney)
            }).then(() => {
                inputEl.current.classList.add("done");
                setTimeout(() => {
                    inputEl.current.classList.remove("done");
                }, 700);
            }).catch(err => {
                alert(err.message);
                console.log(err);
            });
        }
    };

    return (
        <div className="money">
            <form className="money-form" onSubmit={e => {
                e.preventDefault();
                inputEl.current.blur();
            }}>
                <input type="text" ref={inputEl} pattern="\d*" value={newMoney} onChange={e => setNewMoney(e.target.value)} onBlur={saveMoney} />
            </form>
        </div>
    );
}

export default MoneyForm;