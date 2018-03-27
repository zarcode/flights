import React, { Component } from 'react';
import { Link } from "react-router-dom";
import {connect} from "react-redux";

const Flight = (props) => {
  const {flightsList, match: {params: { Id } }} = props;

  const flight = flightsList.filter(item => item.Id.toString() === Id);

  return (
    <div>
      <Link to="/">{"<< Back to List"}</Link>
      {flight.length > 0 && (
        <div className="about-flight">
          {"Man" in flight[0] && <p><strong>Airplane Manufacturer</strong>{` ${flight[0].Man}`}</p>}
          {"Type" in flight[0] && <p><strong>Model</strong>{` ${flight[0].Type}`}</p>}
          {"From" in flight[0] && <p><strong>Destination airport</strong>{` ${flight[0].From}`}</p>}
          {"To" in flight[0] && <p><strong>Origin airport</strong>{` ${flight[0].To}`}</p>}
        </div>
      )}
    </div>
  )
};


Flight.propTypes = {

};

const mapStateToProps = (state, ownProps) => ({
  flightsList: state.flights.list
});

export default connect(mapStateToProps)(Flight);