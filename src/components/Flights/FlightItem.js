import React from 'react';
import { Link } from "react-router-dom";

import './FlightItem.css';
const FlightItem = ({flight}) => {
  const classes = flight.Trak > 180?" west":" east";

  return (
    <Link
      to={`/flight/${flight.Id}`}>
      <div className={`flight-item${classes}`}>
          <img alt={"Call" in flight?flight.Call:"flight"} src="http://via.placeholder.com/80x80" />
          <div className="description">
            <p><strong>Flight code number:</strong>{` ${"Call" in flight?flight.Call:"/"}`}</p>
            <p><strong>Altitude:</strong>{` ${"Alt" in flight?flight.Alt:"/"}`}</p>
          </div>
      </div>
    </Link>
  )
};

export default FlightItem;