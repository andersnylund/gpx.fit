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

export const RouteChangeListener = (): null => {
  const route = useAppSelector((state) => state.routes.route);
  const selectedRoute = useAppSelector((state) => state.routes.selectedRoute);
  const map = useMap();

  useEffect(() => {
    if (selectedRoute) {
      const bounds = getBounds(selectedRoute);
      map.fitBounds(bounds);
    } else if (route) {
      const bounds = getBounds(route);
      map.fitBounds(bounds);
    }
  }, [route, selectedRoute, map]);

  return null;
};
