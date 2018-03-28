import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BrowserRouter as Router, Route } from "react-router-dom";

// import "./Layout.css";
import { setCoordinates, setCoordinatesFail } from "../../actions/position";
import Flights from "../Flights";
import Flight from "../Flight";

class Layout extends Component {
  constructor(props) {
    super(props);

    this.positionSuccess = this.positionSuccess.bind(this);
    this.positionError = this.positionError.bind(this);
  }

  componentDidMount() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(this.positionSuccess, this.positionError);
    } else {
      this.props.setCoordinatesFailAction("Geolocation is not supported by this browser.");
    }
  }

  positionSuccess(position) {
    this.props.setCoordinatesAction(position.coords.latitude, position.coords.longitude);
  }

  positionError(error) {
    let message = "An unknown error occurred.";
    switch(error.code) {
      case error.PERMISSION_DENIED:
        message = "User denied the request for Geolocation.";
        break;
      case error.POSITION_UNAVAILABLE:
        message = "Location information is unavailable.";
        break;
      case error.TIMEOUT:
        message = "The request to get user location timed out.";
        break;
      default:
        message = "An unknown error occurred.";
    }

    this.props.setCoordinatesFailAction(message);
  }

  render() {
    return (
      <Router>
        <div className="layout">
          <Route exact path="/" component={Flights} />
          <Route path="/flight/:Id" component={Flight} />
        </div>
      </Router>
    )

  }
}

Layout.propTypes = {

};

const mapDispatchToProps = dispatch => ({
  setCoordinatesAction: bindActionCreators(setCoordinates, dispatch),
  setCoordinatesFailAction: bindActionCreators(setCoordinatesFail, dispatch)
});

export default connect(null, mapDispatchToProps)(Layout);