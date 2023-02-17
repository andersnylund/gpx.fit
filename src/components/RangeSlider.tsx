import { Slider } from '@mui/material';
import { produce } from 'immer';
import debounce from 'lodash.debounce';
import { useEffect, useState } from 'react';
import { z } from 'zod';
import { Coordinate, setSelectedRoute } from '~/features/route';
import { useAppDispatch, useAppSelector } from '~/hooks';
import { AppDispatch } from '~/store';

const sliderSchema = z.tuple([z.number(), z.number()]);
type Values = z.infer<typeof sliderSchema>;

const debouncedOnChange = debounce((values: Values, track: Coordinate[], dispatch: AppDispatch) => {
  const selectedRoute = produce(track, (draftTrack) => {
    return draftTrack.slice(values[0], values[1]);
  });
  dispatch(setSelectedRoute(selectedRoute));
}, 100);

export const RangeSlider = () => {
  const route = useAppSelector((state) => state.routes.route);
  const dispatch = useAppDispatch();

  const [values, setValues] = useState([0, 0]);

  useEffect(() => {
    if (route) {
      setValues([1, route.length]);
    }
  }, [route]);

  if (!route) {
    return null;
  }

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
      min={1}
      max={routeLength}
      valueLabelDisplay="auto"
      getAriaValueText={(value) => value.toString()}
    />
  );
};
