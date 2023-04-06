import styled from '@emotion/styled';
import { Add, FileOpen } from '@mui/icons-material';
import { Button } from '@mui/joy';
import { useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { Coordinate, coordinateSchema, setRoute } from '~/features/route';
import { useAppDispatch } from '~/hooks';
import { parseGpx } from '~/parser/strava-parser';

export const Dropzone = () => {
  const { acceptedFiles, getRootProps, getInputProps, isDragActive } = useDropzone({});

  const dispatch = useAppDispatch();

  useEffect(() => {
    const parseFile = async () => {
      const file = acceptedFiles[0];
      if (file) {
        const text = await file.text();
        const gpx = parseGpx(text).toObject();
        const coordinates = gpx.trk
          ?.flatMap((track) =>
            track.trkseg
              ?.flatMap((segment) =>
                segment.trkpt?.map((point) =>
                  coordinateSchema.parse({
                    elevation: point.ele,
                    latitude: point.attributes.lat,
                    longitude: point.attributes.lon,
                    timestamp: point.time?.toISOString(),
                    heartRate: point.extensions?.['gpxtpx:TrackPointExtension']?.['gpxtpx:hr'],
                  })
                )
              )
              .filter((coordinate): coordinate is Coordinate => !!coordinate)
          )
          .filter((coordinate): coordinate is Coordinate => !!coordinate);
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
