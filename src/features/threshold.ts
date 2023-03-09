import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface ThresholdState {
  threshold: number;
}

const initialState: ThresholdState = {
  threshold: 10,
};

const thresholdSlice = createSlice({
  name: 'threshold',
  initialState,
  reducers: {
    setThreshold: (state, action: PayloadAction<number>) => {
      state.threshold = action.payload;
    },
  },
});

export const { setThreshold } = thresholdSlice.actions;
export const thresholdReducer = thresholdSlice.reducer;
