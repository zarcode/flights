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
  }

  componentDidMount() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
          this.props.setCoordinatesAction(position.coords.latitude, position.coords.longitude);
      });
    } else {
      this.props.setCoordinatesFailAction();
    }
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