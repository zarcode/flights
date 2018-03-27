const initialState = {
  errorMessage: null,
  isFetching: false,
  list: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_FLIGHTS_REQUEST':
      return {
        ...state,
        isFetching: true,
        errorMessage: null
      };
    case 'FETCH_FLIGHTS_SUCCESS':
      return {
        ...state,
        isFetching: false,
        list: action.response
      };
    case 'FETCH_FLIGHTS_FAILURE':
      return {
        ...state,
        isFetching: false,
        errorMessage: action.message
      };
    default:
      return state
  }
};