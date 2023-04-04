export function degreesToRadians(degrees) {
  return (degrees * Math.PI) / 180;
}

export function distanceInKmBetweenEarthCoordinates(lat1, lng1, lat2, lng2) {
  const earthRadiusKm = 6371;

  const dLat = degreesToRadians(lat2 - lat1);
  const dLng = degreesToRadians(lng2 - lng1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(degreesToRadians(lat1)) *
      Math.cos(degreesToRadians(lat2)) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return earthRadiusKm * c;
}

export const ordenarPorPuntos = (a, b) => {
  if (a.puntos < b.puntos) {
    return 1;
  }
  if (a.puntos > b.puntos) {
    return -1;
  }
  return 0;
};