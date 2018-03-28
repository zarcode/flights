const initialState = {
  message: null,
  coords: {
    latitude: null,
    longitude: null,
  }
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'SET_COORDINATES':
      return {
        message: null,
        coords: {
          latitude: action.latitude,
          longitude: action.longitude,
        }
      };
    case 'SET_COORDINATES_FAIL':
      return {
        message: action.message,
        coords: {
          latitude: null,
          longitude: null
        }
      };
    default:
      return state
  }
};