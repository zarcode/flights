import React, { Component } from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { BrowserRouter as Router, Route } from "react-router-dom";

// import "./Layout.css";
import { fetchFlights } from "../../actions/flights";
import Flights from "../Flights";
import Flight from "../Flight";

class Layout extends Component {
  constructor(props) {
    super(props);

    this.timer = null;
  }

  componentDidMount() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.props.fetchLayoutAction(position.coords.latitude, position.coords.longitude);
        this.timer = setInterval(() => {
          this.props.fetchLayoutAction(position.coords.latitude, position.coords.longitude);
        }, 1000*60);
      });
    } else {
      /* geolocation IS NOT available */
    }
  }

  componentWillUnmount() {
    clearInterval(this.timer);
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
  fetchLayoutAction: bindActionCreators(fetchFlights, dispatch)
});

export default connect(null, mapDispatchToProps)(Layout);