import { Button } from '@mui/joy';
import { Coordinate, setRoute } from '~/features/route';
import { useAppDispatch } from '~/hooks';

export const testRoute: Coordinate[] = [
  {
    elevation: 29.6,
    latitude: 60.2146386,
    longitude: 24.9142349,
    timestamp: '2023-03-03T08:45:20.000Z',
    heartRate: 111,
  },
  {
    elevation: 29.6,
    latitude: 60.2148491,
    longitude: 24.9143636,
    timestamp: '2023-03-03T08:45:22.000Z',
    heartRate: 112,
  },
  {
    elevation: 29.6,
    latitude: 60.2150543,
    longitude: 24.9144441,
    timestamp: '2023-03-03T08:45:24.000Z',
    heartRate: 113,
  },
  {
    elevation: 29.6,
    latitude: 60.2152302,
    longitude: 24.9145192,
    timestamp: '2023-03-03T08:45:26.000Z',
    heartRate: 114,
  },
  {
    elevation: 29.6,
    latitude: 60.2154194,
    longitude: 24.9145943,
    timestamp: '2023-03-03T08:45:28.000Z',
    heartRate: 115,
  },
  {
    elevation: 29.6,
    latitude: 60.2154354,
    longitude: 24.9144763,
    timestamp: '2023-03-03T08:45:30.000Z',
    heartRate: 116,
  },
  {
    elevation: 29.6,
    latitude: 60.2153901,
    longitude: 24.9145031,
    timestamp: '2023-03-03T08:45:32.000Z',
    heartRate: 117,
  },
  {
    elevation: 29.6,
    latitude: 60.2153687,
    longitude: 24.9146694,
    timestamp: '2023-03-03T08:45:34.000Z',
    heartRate: 118,
  },
  {
    elevation: 29.6,
    latitude: 60.21547,
    longitude: 24.9145353,
    timestamp: '2023-03-03T08:45:36.000Z',
    heartRate: 119,
  },
  {
    elevation: 29.6,
    latitude: 60.215454,
    longitude: 24.9146158,
    timestamp: '2023-03-03T08:45:38.000Z',
    heartRate: 120,
  },
  {
    elevation: 29.6,
    latitude: 60.2155979,
    longitude: 24.9146748,
    timestamp: '2023-03-03T08:45:40.000Z',
    heartRate: 121,
  },
  {
    elevation: 29.6,
    latitude: 60.2157871,
    longitude: 24.9147606,
    timestamp: '2023-03-03T08:45:42.000Z',
    heartRate: 122,
  },
  {
    elevation: 29.6,
    latitude: 60.2159603,
    longitude: 24.9148571,
    timestamp: '2023-03-03T08:45:44.000Z',
    heartRate: 123,
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
