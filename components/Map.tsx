import gpxParser from 'gpxparser';
import { LatLng } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ReactElement, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { MapContainer, Polyline, TileLayer, useMapEvent, useMap } from 'react-leaflet';

const getMiddlePoint = (points: LatLng[]): LatLng => {
  let sumLongitude = 0;
  let sumLatitude = 0;
  points.map(({ lat, lng }) => {
    sumLongitude += lng;
    sumLatitude += lat;
  });
  return new LatLng(sumLatitude / points.length, sumLongitude / points.length);
};

export const Map = (): ReactElement => {
  const [viewState, setViewState] = useState({
    longitude: 0,
    latitude: 0,
  });

  const { acceptedFiles, getRootProps, getInputProps, isDragActive } = useDropzone({});

  const [lineCoordinates, setLineCoordinates] = useState<LatLng[]>([]);

  useEffect(() => {
    const parseFile = async () => {
      const file = acceptedFiles[0];
      if (file) {
        const text = await file.text();
        var gpx = new gpxParser();
        gpx.parse(text);
        const coordinates: LatLng[] = gpx.tracks[0].points.map((point) => new LatLng(point.lat, point.lon));
        setLineCoordinates(coordinates);
        const middle = getMiddlePoint(coordinates);
        setViewState((state) => ({ ...state, longitude: middle.lng, latitude: middle.lat }));
      }
    };
    parseFile();
  }, [acceptedFiles]);

  return (
    <>
      <MapContainer
        center={[viewState.latitude, viewState.longitude]}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: '80vh' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {lineCoordinates.length > 0 && <Polyline positions={lineCoordinates} />}
      </MapContainer>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag &apos;n&apos; drop some files here, or click to select files</p>
        )}
      </div>
    </>
  );
};
