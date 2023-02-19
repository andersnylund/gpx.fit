import { Slider } from '@mui/joy';
import { produce } from 'immer';
import throttle from 'lodash.throttle';
import { useEffect, useState } from 'react';
import { z } from 'zod';
import { Coordinate, setSelectedRoute } from '~/features/route';
import { useAppDispatch } from '~/hooks';
import { AppDispatch } from '~/store';

const sliderSchema = z.tuple([z.number(), z.number()]);
type Values = z.infer<typeof sliderSchema>;

const debouncedOnChange = throttle((values: Values, track: Coordinate[], dispatch: AppDispatch) => {
  const selectedRoute = produce(track, (draftTrack) => {
    return draftTrack.slice(values[0], values[1]);
  });
  dispatch(setSelectedRoute(selectedRoute));
}, 100);

interface Props {
  route: Coordinate[];
}

export const RangeSlider = ({ route }: Props) => {
  const dispatch = useAppDispatch();

  const [values, setValues] = useState([0, 0]);

  useEffect(() => {
    setValues([1, route.length]);
  }, [route]);

  const routeLength = route.length;

  return (
    <Slider
      getAriaLabel={() => 'Track start and endpoint'}
      value={values}
      onChange={(e, values) => {
        const parsedValues = sliderSchema.safeParse(values);
        if (parsedValues.success) {
          const data = parsedValues.data;
          setValues(data);
          debouncedOnChange(data, route, dispatch);
        }
      }}
      variant="soft"
      min={1}
      max={routeLength}
      valueLabelDisplay="auto"
      getAriaValueText={(value) => value.toString()}
    />
  );
};
