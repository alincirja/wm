import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faEnvelopeOpenText, faBan, faThumbsUp, faThumbsDown, faSmile, faUsers } from "@fortawesome/free-solid-svg-icons";
import * as appConstants from "../../constants";


const Filter = props => {
    const { filterCriteria, setFilterCriteria } = props;

    const handleFilter = e => {
        setFilterCriteria(e.currentTarget.getAttribute("value"));
    }

    return (
        <div className="filter-guests">
            <ul>
                <li
                    className={filterCriteria === "all" ? "active" : ""}
                    value="all"
                    onClick={handleFilter}
                ><FontAwesomeIcon icon={faUsers} /></li>
                <li
                    className={filterCriteria === appConstants.RSVP_UNSET ? "active" : ""}
                    value={appConstants.RSVP_UNSET}
                    onClick={handleFilter}
                ><FontAwesomeIcon icon={faInfoCircle} /></li>
                <li
                    className={filterCriteria === appConstants.RSVP_SENT ? "active" : ""}
                    value={appConstants.RSVP_SENT}
                    onClick={handleFilter}
                ><FontAwesomeIcon icon={faEnvelopeOpenText} /></li>
                <li
                    className={filterCriteria === appConstants.RSVP_ACCEPTED ? "active" : ""}
                    value={appConstants.RSVP_ACCEPTED}
                    onClick={handleFilter}
                ><FontAwesomeIcon icon={faThumbsUp} /></li>
                <li
                    className={filterCriteria === appConstants.RSVP_DECLINED ? "active" : ""}
                    value={appConstants.RSVP_DECLINED}
                    onClick={handleFilter}
                ><FontAwesomeIcon icon={faThumbsDown} /></li>
                <li
                    className={filterCriteria === appConstants.RSVP_CANCELED ? "active" : ""}
                    value={appConstants.RSVP_CANCELED}
                    onClick={handleFilter}
                ><FontAwesomeIcon icon={faBan} /></li>
                <li
                    className={filterCriteria === appConstants.RSVP_ARRIVED ? "active" : ""}
                    value={appConstants.RSVP_ARRIVED}
                    onClick={handleFilter}
                ><FontAwesomeIcon icon={faSmile} /></li>
            </ul>
        </div>
    );
};

export default Filter;