import styled from '@emotion/styled';
import { Add } from '@mui/icons-material';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import { Button } from '@mui/joy';
import { useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Coordinate, setRoute } from '~/features/route';
import { useAppDispatch } from '~/hooks';

export const Dropzone = () => {
  const { acceptedFiles, getRootProps, getInputProps, isDragActive } = useDropzone({});

  const dispatch = useAppDispatch();

  useEffect(() => {
    const parseFile = async () => {
      const file = acceptedFiles[0];
      if (file) {
        const GpxParser = (await import('gpxparser')).default;
        const text = await file.text();
        const gpx = new GpxParser();
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
        <Dropbox>
          <Add color={'success'} />
        </Dropbox>
      ) : (
        <Button title="Add gpx file" color="neutral" variant="soft">
          <FileOpenIcon />
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
