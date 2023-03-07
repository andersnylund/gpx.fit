import styled from '@emotion/styled';
import { Add, FileOpen } from '@mui/icons-material';
import { Button } from '@mui/joy';
import { _experimentalParseGpx } from 'gpx-builder';
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
        const text = await file.text();
        const gpx = _experimentalParseGpx(text).toObject();
        const coordinates: Coordinate[] | undefined = gpx.trk
          ?.at(0)
          ?.trkseg?.at(0)
          ?.trkpt?.map((segment) => ({
            elevation: segment.ele,
            latitude: parseFloat(segment.attributes.lat as unknown as string),
            longitude: parseFloat(segment.attributes.lon as unknown as string),
            timestamp: segment.time?.toISOString(),
          }));
        if (coordinates) {
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
