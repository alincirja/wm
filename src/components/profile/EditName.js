import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/Auth";

const EditName = props => {
    const { currentUser } = useContext(AuthContext);
    const [newName, setNewName] = useState(currentUser.displayName || "");

    const handleUpdateName = e => {
        e.preventDefault();
        if (newName === currentUser.displayName || newName.trim() === "") {
            props.setShow(false);
        } else {
            currentUser.updateProfile({
                displayName: newName.trim()
            }).then(() => {
                props.setShow(false);
            }).catch(err => {
                console.log(err);
            });
        }
    }

    return (
        <form className={`edit-name ${props.show && "show"}`} onSubmit={handleUpdateName}>
            <h5>Editare nume</h5>
            <input type="text" name="name" id="name" value={newName} onChange={e => setNewName(e.target.value)} placeholder="Nume Intreg" />
            <button type="submit">Salvare</button>
            <div className="cancel" onClick={() => props.setShow(false)}>Anulare</div>
        </form>
    );
};

export default EditName;