import React from "react";
import { Link } from "react-router-dom";

const BillHeader = (props) => {
    return (
        <div>
            <div className="heading"><Link style={{color: 'black'}} to="/dashboard">{props.heading}</Link></div>
        </div>
    )
};

export default BillHeader