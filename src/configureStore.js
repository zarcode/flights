import logger from "redux-logger";
import {combineReducers, createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";

import position from "./reducers/position";
import flights from "./reducers/flights";

export default () => {
  const middleWares = [thunk];

  if (process.env.NODE_ENV) {
    middleWares.push(logger);
  }

  const appReducer = combineReducers({
    position,
    flights,
  });

  return createStore(appReducer, applyMiddleware(...middleWares));
};