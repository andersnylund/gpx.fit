import { Coordinate } from './features/route';

const MINUTES_IN_A_DEGREE = 60;
const METERS_IN_NAUTICAL_MILE = 1852;

export const getDistanceBetweenTwoPoints = (cord1: Coordinate, cord2: Coordinate) => {
  if (cord1.latitude === cord2.latitude && cord1.longitude === cord2.longitude) {
    return 0;
  }

  const radlat1 = (Math.PI * cord1.latitude) / 180;
  const radlat2 = (Math.PI * cord2.latitude) / 180;

  const theta = cord1.longitude - cord2.longitude;
  const radtheta = (Math.PI * theta) / 180;

  let dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);

  if (dist > 1) {
    dist = 1;
  }

  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * MINUTES_IN_A_DEGREE * METERS_IN_NAUTICAL_MILE;

  return dist;
};
