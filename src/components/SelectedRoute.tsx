import { LatLng } from 'leaflet';
import { ReactElement } from 'react';
import { Polyline } from 'react-leaflet';
import { useAppSelector } from '../hooks';
import { theme } from './GlobalStyles';

export const SelectedRoute = (): ReactElement | null => {
  const selectedRoute = useAppSelector((state) => state.routes.selectedRoute);

  if (selectedRoute) {
    const positions = selectedRoute.map(({ latitude, longitude }) => new LatLng(latitude, longitude));
    return <Polyline positions={positions} color={theme.palette.primary.main} />;
  }

  return null;
};
