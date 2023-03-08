import styled from '@emotion/styled';
import { Input } from '@mui/joy';
import debounce from 'lodash.debounce';
import { useEffect, useState } from 'react';
import { z } from 'zod';
import { setTreshold } from '~/features/treshold';
import { useAppDispatch, useAppSelector } from '~/hooks';
import { AppDispatch } from '~/store';

const debouncedOnChange = debounce((value: number, dispatch: AppDispatch) => {
  dispatch(setTreshold(value));
}, 300);

export const Treshold = () => {
  const storeTresholdValue = useAppSelector((state) => state.treshold.treshold);
  const dispatch = useAppDispatch();

  const [value, setValue] = useState(storeTresholdValue);

  useEffect(() => {
    setValue(storeTresholdValue);
  }, [storeTresholdValue]);

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
            debouncedOnChange(value.data, dispatch);
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
