export const setCoordinates = (latitude, longitude) => ({
  type: "SET_COORDINATES",
  latitude,
  longitude
});

export const setCoordinatesFail = (message) => ({
  type: "SET_COORDINATES_FAIL",
  message
});