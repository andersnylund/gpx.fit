import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface Coordinate {
  latitude: number;
  longitude: number;
}

export interface RouteState {
  route?: Coordinate[];
}

const initialState: RouteState = {};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setRoute: (state, action: PayloadAction<Coordinate[]>) => {
      state.route = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setRoute } = counterSlice.actions;

export const routeReducer = counterSlice.reducer;
