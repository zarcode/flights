import React, {Component} from 'react';
import { Link } from "react-router-dom";
import {connect} from "react-redux";

import "./Flight.css"
import { fetchDomain } from "../../utils"

class Flight extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: null
    };

    this.showImage = this.showImage.bind(this);
  }

  componentDidMount() {
    const { flight } = this.props;
    if(flight.length > 0 && "Op" in flight[0]) {
      fetchDomain(flight[0].Op).then((logo) => {
        this.setState({
          image: logo
        })
      })
    }
  }

  showImage() {
    const { flight } = this.props;
    if(this.state.image === null) {
      return (
          <div className="lds-dual-ring-small"/>
      )
    }

    if(typeof this.state.image === "undefined") {
      return <img src="http://via.placeholder.com/200x200" alt={"Op" in flight[0]?flight.Op:"Company"} />
    }

    return <img src={this.state.image} alt={"Op" in flight[0]?flight.Op:"Company"}/>

  }

 render() {
    const { flight } = this.props;

    return (
    <div>
       <Link to="/">{"<< Back to List"}</Link>
       {flight.length > 0 && (
         <div className="about-flight">
           <div className="img-wrapper">
             {this.showImage()}
           </div>
           {"Man" in flight[0] && <p><strong>Airplane Manufacturer</strong>{` ${flight[0].Man}`}</p>}
           {"Type" in flight[0] && <p><strong>Model</strong>{` ${flight[0].Type}`}</p>}
           {"From" in flight[0] && <p><strong>Destination airport</strong>{` ${flight[0].From}`}</p>}
           {"To" in flight[0] && <p><strong>Origin airport</strong>{` ${flight[0].To}`}</p>}
         </div>
       )}
    </div>
    )
 }
};


Flight.propTypes = {

};

const mapStateToProps = (state, ownProps) => ({
  flight: state.flights.list.filter(item => item.Id.toString() === ownProps.match.params.Id)
});

export default connect(mapStateToProps)(Flight);