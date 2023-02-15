import gpxParser from 'gpxparser';
import { useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Coordinate, setRoute } from '../features/route';
import { useAppDispatch } from '../hooks';

export const Dropzone = () => {
  const { acceptedFiles, getRootProps, getInputProps, isDragActive } = useDropzone({});

  const dispatch = useAppDispatch();

  useEffect(() => {
    const parseFile = async () => {
      const file = acceptedFiles[0];
      if (file) {
        const text = await file.text();
        const gpx = new gpxParser();
        gpx.parse(text);
        if (gpx.tracks[0]) {
          const coordinates: Coordinate[] = gpx.tracks[0].points.map((point) => ({
            latitude: point.lat,
            longitude: point.lon,
          }));
          dispatch(setRoute(coordinates));
        }
      }
    };
    parseFile();
  }, [acceptedFiles, dispatch]);

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag &apos;n&apos; drop some files here, or click to select files</p>
      )}
    </div>
  );
};
