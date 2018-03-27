import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import "./Flights.css";
import FlightItem from "./FlightItem"
import { fetchFlights } from "../../actions/flights"

class Flights extends Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.flights.errorMessage) {
      alert(`We were unable to provide new data, this error happened: "${nextProps.flights.errorMessage}"`);
    }
  }

  render() {
    if(this.props.flights.list.length === 0 || this.props.flights.isFetching) {
      return (
        <div className="spinnerHolder">
          <div className="lds-dual-ring"/>
        </div>
      )
    }

    return (
      <div>
        {this.props.flights.list.map((flight) => (
          <FlightItem key={flight.Id} flight={flight}/>
        ))}
      </div>
    )

  }
}

Flights.propTypes = {

};

const mapStateToProps = (state, ownProps) => ({
  flights: state.flights
});

const mapDispatchToProps = dispatch => ({
  fetchFlightsAction: bindActionCreators(fetchFlights, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Flights);