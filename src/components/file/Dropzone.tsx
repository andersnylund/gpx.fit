import styled from '@emotion/styled';
import { Add, FileOpen } from '@mui/icons-material';
import { Button } from '@mui/joy';
import gpxParser from 'gpxparser';
import { useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Coordinate, setRoute } from '../../features/route';
import { useAppDispatch } from '../../hooks';

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
      <input {...getInputProps()} data-testid="file-input" />
      {/* c8 ignore start */}
      {isDragActive ? (
        <Dropbox>
          <Add color={'success'} />
        </Dropbox> /* c8 ignore stop */
      ) : (
        <Button title="Add gpx file" color="neutral" variant="soft">
          <FileOpen />
        </Button>
      )}
    </div>
  );
};

const Dropbox = styled.div`
  align-items: center;
  border-radius: 8px;
  border-style: dashed;
  display: flex;
  height: 64px;
  justify-content: center;
  width: 64px;
`;
