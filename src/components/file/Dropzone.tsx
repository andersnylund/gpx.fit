import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Add } from '@mui/icons-material';
import FileOpenIcon from '@mui/icons-material/FileOpen';
import { Button } from '@mui/material';
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
      <input {...getInputProps()} />
      {isDragActive ? (
        <Dropbox>
          <Add color={'success'} />
        </Dropbox>
      ) : (
        <Button title="Add gpx file" color="primary" variant="contained">
          <FileOpenIcon />
        </Button>
      )}
    </div>
  );
};

const Dropbox = styled.div(
  ({ theme }) => css`
    align-items: center;
    background-color: ${theme.palette.background.default};
    border-color: ${theme.palette.divider};
    border-radius: 8px;
    border-style: dashed;
    display: flex;
    height: 64px;
    justify-content: center;
    width: 64px;
  `
);
