// const SITE_URL = "https://public-api.adsbexchange.com/VirtualRadar/AircraftList.json?lat=33.433638&lng=-112.008113&fDstL=0&fDstU=100"
const SITE_URL = "http://localhost:3000/flights.json"

const fetchFlightsRequest = () => ({
  type: "FETCH_FLIGHTS_REQUEST"
});

const fetchFlightsSuccess = (json) => ({
  type: "FETCH_FLIGHTS_SUCCESS",
  response: json
});

const fetchFlightsFailure = (ex) => ({
  type: "FETCH_FLIGHTS_FAILURE",
  message: ex,
});


export const fetchFlights = (args) => (dispatch, getState) => {
  if(getState().flights.isFetching)
    return false;

  dispatch(fetchFlightsRequest());

  return fetch(SITE_URL)
    .then(res => res.json())
    .then(json => {
      if("acList" in json) {
        const sortedFlights = json.acList.sort((a, b) => {
          if (a.Alt > b.Alt) {
            return -1;
          }
          if (a.Alt < b.Alt) {
            return 1;
          }
          // a must be equal to b
          return 0;
        });
        dispatch(fetchFlightsSuccess(sortedFlights))
      } else {
        dispatch(fetchFlightsFailure("Wrong data was fetched"))
      }
    })
    .catch(ex => dispatch(fetchFlightsFailure(ex.message)))
};