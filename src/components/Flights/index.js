import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import { fetchFlights } from "../../actions/flights"

class Flights extends Component {
  constructor(props) {
    super(props);

    this.timer = null;
  }

  componentDidMount() {
    // this.timer = setInterval(() => {
    //
    // }, 1000);
    this.props.fetchFlightsAction();
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.flights.errorMessage) {
      alert(`We were unable to provide new data, this error happened: "${nextProps.flights.errorMessage}"`);
    }
  }

  render() {
    return (
      <div>
        {this.props.flights.list.map((flight) => (
          <Link
            key={flight.Id}
            to="/flight">
              Item
          </Link>
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