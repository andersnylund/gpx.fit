import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface TresholdState {
  treshold: number;
}

const initialState: TresholdState = {
  treshold: 10,
};

export const tresholdSlice = createSlice({
  name: 'treshold',
  initialState,
  reducers: {
    setTreshold: (state, action: PayloadAction<number>) => {
      state.treshold = action.payload;
    },
  },
});

export const { setTreshold } = tresholdSlice.actions;
export const tresholdReducer = tresholdSlice.reducer;
