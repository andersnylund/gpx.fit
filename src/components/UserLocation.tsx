import { useMap } from 'react-leaflet';
import { useAppSelector } from '~/hooks';

export const UserLocation = () => {
  const route = useAppSelector((state) => state.routes.route);
  const map = useMap();

  if (!route) {
    const navigator = window.navigator;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        map.flyTo([position.coords.latitude, position.coords.longitude], 13);
      });
    }
  }
  return null;
};
