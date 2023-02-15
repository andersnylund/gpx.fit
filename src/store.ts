import { configureStore } from '@reduxjs/toolkit';
import { routeReducer } from './features/route';

export const store = configureStore({
  reducer: {
    route: routeReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
