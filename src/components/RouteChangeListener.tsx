import { LatLng, LatLngBounds } from 'leaflet';
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';
import { Coordinate } from '../features/route';
import { useAppSelector } from '../hooks';

const getBounds = (points: Coordinate[]): LatLngBounds => {
  let mostNorth = 180;
  let mostEast = 180;
  let mostSouth = -180;
  let mostWest = -180;

  for (const point of points) {
    if (point.latitude < mostNorth) {
      mostNorth = point.latitude;
    }
    if (point.longitude < mostEast) {
      mostEast = point.longitude;
    }
    if (point.latitude > mostSouth) {
      mostSouth = point.latitude;
    }
    if (point.longitude > mostWest) {
      mostWest = point.longitude;
    }
  }

  return new LatLngBounds(new LatLng(mostSouth, mostWest), new LatLng(mostNorth, mostEast));
};

export const RouteChangeListener = () => {
  const route = useAppSelector((state) => state.routes.route);
  const map = useMap();

  useEffect(() => {
    if (route) {
      const bounds = getBounds(route);
      map.fitBounds(bounds);
    }
  }, [route, map]);

  return null;
};
