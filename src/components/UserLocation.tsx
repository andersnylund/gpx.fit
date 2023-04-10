import React, { useEffect } from 'react';
import { useMap } from 'react-leaflet';

export const UserLocation = () => {
  const map = useMap();

  const navigator = window.navigator;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      map.flyTo([position.coords.latitude, position.coords.longitude], 13);
    });
  }
  return null;
};
