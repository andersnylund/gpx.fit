import gpxParser from 'gpxparser';
import { GeoJSONSourceOptions } from 'mapbox-gl';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Map, { Layer, LayerProps, Source } from 'react-map-gl';
import { Position } from 'geojson';

const getMiddlePoint = (points: Position[]): [number, number] => {
  let sumLongitude = 0;
  let sumLatitude = 0;
  points.map(([longitude, latitude]) => {
    sumLongitude += longitude;
    sumLatitude += latitude;
  });
  return [sumLongitude / points.length, sumLatitude / points.length];
};

const Home: NextPage = () => {
  const [viewState, setViewState] = useState({
    longitude: 0,
    latitude: 0,
    zoom: 13,
  });

  const { acceptedFiles, getRootProps, getInputProps, isDragActive } = useDropzone({});

  const [lineCoordinates, setLineCoordinates] = useState<Position[]>([]);

  useEffect(() => {
    const parseFile = async () => {
      const file = acceptedFiles[0];
      if (file) {
        const text = await file.text();
        var gpx = new gpxParser();
        gpx.parse(text);
        const positionArray: Position[] = gpx.tracks[0].points.map((point): Position => [point.lon, point.lat]);
        setLineCoordinates(positionArray);
        const middle = getMiddlePoint(positionArray);
        setViewState((state) => ({ ...state, longitude: middle[0], latitude: middle[1] }));
      }
    };
    parseFile();
  }, [acceptedFiles]);

  const geojson: GeoJSONSourceOptions['data'] = {
    type: 'FeatureCollection',
    features: [{ type: 'Feature', geometry: { type: 'LineString', coordinates: lineCoordinates }, properties: {} }],
  };

  const layerProps: LayerProps = {
    id: 'point',
    type: 'line',
    paint: { 'line-width': 2, 'line-color': 'red' },
  };

  return (
    <div style={{ height: '100vh' }}>
      <Map
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        mapStyle="mapbox://styles/mapbox/outdoors-v12"
        mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN}
        style={{ width: '100vw', height: '90vh' }}
        attributionControl={false}
      >
        <Source id="my-data" type="geojson" data={geojson}>
          <Layer {...layerProps} />
        </Source>
      </Map>
      <div {...getRootProps()}>
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <p>Drag &apos;n&apos; drop some files here, or click to select files</p>
        )}
      </div>
    </div>
  );
};

export default Home;
