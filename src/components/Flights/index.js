import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import "./Flights.css";
import FlightItem from "./FlightItem"
import { fetchFlights } from "../../actions/flights"

class Flights extends Component {
  constructor(props) {
    super(props);

    this.timer = null;

    this.runFetch = this.runFetch.bind(this);
  }

  runFetch(latitude, longitude) {
    this.props.fetchFlightsAction(latitude, longitude);
    this.timer = setInterval(() => {
      this.props.fetchFlightsAction(latitude, longitude);
    }, 1000*60);
  }

  componentDidMount() {
    if(
      this.props.positionFailMessage === null
      && this.props.position.latitude
      && this.props.position.longitude
    ) {
      this.runFetch(this.props.position.latitude, this.props.position.longitude);
    }
  }

  componentWillReceiveProps(nextProps) {

    if(nextProps.flights.errorMessage) {
      alert(`We were unable to provide new data, this error happened: "${nextProps.flights.errorMessage}"`);
    }

    if(
      nextProps.positionFailMessage === null
      && nextProps.position.latitude !== this.props.position.latitude
      && nextProps.position.longitude !== this.props.position.longitude
    ) {
        this.runFetch(nextProps.position.latitude, nextProps.position.longitude);
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    if(this.props.positionFailMessage) {
      return (
        <div className="spinnerHolder">
          <p>{this.props.positionFailMessage}</p>
        </div>
      )
    }

    if(this.props.flights.list.length === 0) {
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
  positionFailMessage: state.position.message,
  position: state.position.coords,
  flights: state.flights
});

const mapDispatchToProps = dispatch => ({
  fetchFlightsAction: bindActionCreators(fetchFlights, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(Flights);