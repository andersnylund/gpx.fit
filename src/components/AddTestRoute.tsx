import { Button } from '@mui/joy';
import { Coordinate, setRoute } from '~/features/route';
import { useAppDispatch } from '~/hooks';

export const testRoute: Coordinate[] = [
  {
    latitude: 63.106377,
    longitude: 21.59627,
    elevation: 27.2,
    timestamp: '2016-11-17T16:37:35Z',
  },
  {
    latitude: 63.106379,
    longitude: 21.596372,
    elevation: 27.0,
    timestamp: '2016-11-17T16:37:48Z',
  },
  {
    latitude: 63.10638,
    longitude: 21.596475,
    elevation: 26.8,
    timestamp: '2016-11-17T16:37:49Z',
  },
  {
    latitude: 63.106415,
    longitude: 21.596235,
    elevation: 27.4,
    timestamp: '2016-11-17T16:37:50Z',
  },
  {
    latitude: 63.106485,
    longitude: 21.5961,
    elevation: 27.3,
    timestamp: '2016-11-17T16:37:51Z',
  },
  {
    latitude: 63.106145,
    longitude: 21.59675,
    elevation: 29.6,
    timestamp: '2016-11-17T16:37:53Z',
  },
  {
    latitude: 63.106385,
    longitude: 21.59648,
    elevation: 26.8,
    timestamp: '2016-11-17T16:37:54Z',
  },
];

export const AddTestRoute = () => {
  const dispatch = useAppDispatch();

  return (
    <Button color="neutral" variant="soft" onClick={() => dispatch(setRoute(testRoute))}>
      Test
    </Button>
  );
};
