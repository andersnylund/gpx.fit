import { ReactElement } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import { Route } from './Route';
import { RouteChangeListener } from './RouteChangeListener';

export const Map = (): ReactElement => {
  return (
    <MapContainer center={[64, 21]} zoom={13} scrollWheelZoom={false} style={{ height: '100vh' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Route />
      <RouteChangeListener />
    </MapContainer>
  );
};
