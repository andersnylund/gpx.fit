import { colors } from '@mui/joy';
import { LatLng } from 'leaflet';
import { ReactElement } from 'react';
import { Polyline } from 'react-leaflet';
import { useAppSelector } from '../../hooks';

export const SelectedRoute = (): ReactElement | null => {
  const selectedRoute = useAppSelector((state) => state.routes.selectedRoute);
  const smoothened = useAppSelector((state) => state.routes.smoothenedRoute);

  const positions = selectedRoute?.map(({ latitude, longitude }) => new LatLng(latitude, longitude));
  const smoothenedPositions = smoothened?.map(({ latitude, longitude }) => new LatLng(latitude, longitude));

  return (
    <>
      {positions && <Polyline positions={positions} color={colors.red[400]} />}
      {smoothenedPositions && <Polyline positions={smoothenedPositions} color={colors.green[400]} />}
    </>
  );
};
