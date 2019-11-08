import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { screens } from "../../constants";

import Header from "../common/Header";
import Menu from "../common/Menu";

const ScreenDecorator = props => {
    const location = useLocation();
    const slug = location.pathname === "/" ? "dashboard" : location.pathname.slice(1);

    const [showMenu, setShowMenu] = useState(false);

    return (
        <div className={`container container-${slug}`}>
            <Header screenTitle={screens[slug].title} setShowMenu={setShowMenu} />
            <Menu show={showMenu} setShow={setShowMenu} />

            <div className={`screen-content screen-content-${slug}`}>
                {props.children}
            </div>
        </div>
    );
};

export default ScreenDecorator;