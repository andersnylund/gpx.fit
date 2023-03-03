import { Slider } from '@mui/joy';
import { produce } from 'immer';
import throttle from 'lodash.throttle';
import { useEffect, useState } from 'react';
import { z } from 'zod';
import { Coordinate, setSelectedRoute, setSmoothenedRoute } from '~/features/route';
import { useAppDispatch, useAppSelector } from '~/hooks';
import { smoothen } from '~/smoothen';
import { AppDispatch } from '~/store';

const sliderSchema = z.tuple([z.number(), z.number()]);
type Values = z.infer<typeof sliderSchema>;

const throttledOnChange = throttle((values: Values, track: Coordinate[], treshold: number, dispatch: AppDispatch) => {
  const selectedRoute = produce(track, (draftTrack) => {
    return draftTrack.slice(values[0], values[1]);
  });
  dispatch(setSelectedRoute(selectedRoute));
  const smoothened = smoothen(selectedRoute, treshold);
  dispatch(setSmoothenedRoute(smoothened));
}, 100);

interface Props {
  route: Coordinate[];
}

export const RangeSlider = ({ route }: Props) => {
  const dispatch = useAppDispatch();
  const treshold = useAppSelector((state) => state.treshold.treshold);

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
          throttledOnChange(data, route, treshold, dispatch);
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
