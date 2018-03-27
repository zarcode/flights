import React from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Provider } from 'react-redux';
import 'normalize.css/normalize.css';

import './App.css';
import Flights from "./components/Flights";
import Flight from "./components/Flight";
import configureStore from "./configureStore"

const store = configureStore();

const App = () => (
    <Provider store={store}>
      <Router>
          <div className="layout">
            <Route exact path="/" component={Flights} />
            <Route path="/flight" component={Flight} />
          </div>
      </Router>
    </Provider>
    );

export default App;
