import { colors } from '@mui/joy';
import { LatLng } from 'leaflet';
import { ReactElement } from 'react';
import { Polyline } from 'react-leaflet';
import { useAppSelector } from '../../hooks';

export const SelectedRoute = (): ReactElement | null => {
  const selectedRoute = useAppSelector((state) => state.routes.selectedRoute);

  if (selectedRoute) {
    const positions = selectedRoute.map(({ latitude, longitude }) => new LatLng(latitude, longitude));
    return <Polyline positions={positions} color={colors.red[400]} />;
  }

  return null;
};
