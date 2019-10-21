import React, { useState } from "react";
import Header from "../common/Header";
import Photo from "../profile/Photo";
import Details from "../profile/Details";
import EditName from "../profile/EditName";

const MyProfile = props => {
    const [showEditForm, setShowEditForm] = useState(false);

    return (
        <div className="container container-profile">
            <Header screenTitle="My Profile" />

            <div className="my-profile">
                <Photo />
                <Details setShowForm={setShowEditForm} />
            </div>
            <EditName show={showEditForm} setShow={setShowEditForm} />
        </div>
    );
};

export default MyProfile;