import { LatLng } from 'leaflet';
import { ReactElement } from 'react';
import { Polyline, useMap } from 'react-leaflet';
import { useAppSelector } from '../hooks';

export const Route = (): ReactElement | null => {
  const route = useAppSelector((state) => state.route.route);

  if (route) {
    const positions = route.map(({ latitude, longitude }) => new LatLng(latitude, longitude));
    return <Polyline positions={positions} />;
  }

  return null;
};
