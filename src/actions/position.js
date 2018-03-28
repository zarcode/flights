export const setCoordinates = (latitude, longitude) => ({
  type: "SET_COORDINATES",
  latitude,
  longitude
});

export const setCoordinatesFail = () => ({
  type: "SET_COORDINATES_FAIL",
});