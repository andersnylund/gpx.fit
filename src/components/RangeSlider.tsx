import { Slider } from '@mui/joy';
import { produce } from 'immer';
import debounce from 'lodash.debounce';
import { useEffect, useState } from 'react';
import { z } from 'zod';
import { Coordinate, setSelectedRoute } from '~/features/route';
import { useAppDispatch } from '~/hooks';
import { AppDispatch } from '~/store';

const sliderSchema = z.tuple([z.number(), z.number()]);
type Values = z.infer<typeof sliderSchema>;

const debouncedOnChange = debounce((values: Values, track: Coordinate[], dispatch: AppDispatch) => {
  const selectedRoute = produce(track, (draftTrack) => {
    return draftTrack.slice(values[0], values[1]);
  });
  dispatch(setSelectedRoute(selectedRoute));
}, 300);

interface Props {
  route: Coordinate[];
}

export const RangeSlider = ({ route }: Props) => {
  const dispatch = useAppDispatch();

  const [values, setValues] = useState([0, 0]);

  useEffect(() => {
    setValues([0, route.length]);
  }, [route]);

  const routeLength = route.length;

  return (
    <Slider
      getAriaLabel={(index) => `Track ${index === 0 ? 'start' : 'end'}point`}
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
      min={0}
      max={routeLength}
      valueLabelDisplay="auto"
      getAriaValueText={(value) => `Track point number ${value.toString()}`}
    />
  );
};
