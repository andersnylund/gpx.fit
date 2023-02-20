import styled from '@emotion/styled';
import { Input } from '@mui/joy';
import { debounce } from '@mui/material';
import { useEffect, useState } from 'react';
import { z } from 'zod';
import { Coordinate, setSmoothenedRoute } from '~/features/route';
import { setTreshold } from '~/features/treshold';
import { useAppDispatch, useAppSelector } from '~/hooks';
import { smoothen } from '~/smoothen';
import { AppDispatch } from '~/store';

const debouncedOnChange = debounce((value: number, dispatch: AppDispatch, selectedRoute?: Coordinate[]) => {
  dispatch(setTreshold(value));
  if (selectedRoute) {
    const smoothened = smoothen(selectedRoute, value);
    dispatch(setSmoothenedRoute(smoothened));
  }
}, 300);

export const Treshold = () => {
  const storeValue = useAppSelector((state) => state.treshold.treshold);
  const selectedRoute = useAppSelector((state) => state.routes.selectedRoute);
  const dispatch = useAppDispatch();

  const [value, setValue] = useState(storeValue);

  useEffect(() => {
    setValue(storeValue);
  }, [storeValue]);

  return (
    <TresholdContainer>
      <Input
        variant="soft"
        type="number"
        value={value}
        slotProps={{
          input: {
            min: 0,
            step: 1,
          },
        }}
        onChange={(event) => {
          const value = z.number().safeParse(parseInt(event.target.value, 10));
          if (value.success) {
            setValue(value.data);
            debouncedOnChange(value.data, dispatch, selectedRoute);
          }
        }}
      />
    </TresholdContainer>
  );
};

const TresholdContainer = styled.div`
  width: min-content;
  display: flex;
  gap: 16px;
`;
