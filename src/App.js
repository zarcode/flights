import React from 'react';
import { Provider } from 'react-redux';
import 'normalize.css/normalize.css';

import './App.css';
import Layout from "./components/Layout";
import configureStore from "./configureStore"

const store = configureStore();

const App = () => (
    <Provider store={store}>
        <Layout/>
    </Provider>
    );

export default App;
