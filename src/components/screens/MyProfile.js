import React, { useState } from "react";
import ScreenDecorator from "./ScreenDecorator";
import Photo from "../profile/Photo";
import Details from "../profile/Details";
import EditName from "../profile/EditName";

const MyProfile = props => {
    const [showEditForm, setShowEditForm] = useState(false);

    return (
        <ScreenDecorator>
            <div className="my-profile">
                <Photo />
                <Details setShowForm={setShowEditForm} />
            </div>
            <EditName show={showEditForm} setShow={setShowEditForm} />
        </ScreenDecorator>
    );
};

export default MyProfile;