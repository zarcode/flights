const initialState = {
  latitude: null,
  longitude: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_COORDINATES':
      return {
        latitude: action.latitude,
        longitude: action.longitude,
      };
    case 'SET_COORDINATES_FAIL':
      return {
        latitude: -1,
        longitude: -1
      };
    default:
      return state
  }
};