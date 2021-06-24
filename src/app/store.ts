import { Action, combineReducers, configureStore, ThunkAction } from "@reduxjs/toolkit";
import cards from "../features/dashboard/dashboardSlice";
import { views } from "../features/views/viewsSlice";
import { grid } from "../features/grid/slices/gridSlice";

import { createEpicMiddleware } from 'redux-observable';

const epicMiddleware = createEpicMiddleware();

const rootReducer = combineReducers({
  cards,
  views,
  grid,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(epicMiddleware),
});

export type RootState = ReturnType<typeof rootReducer>;

// if (process.env.NODE_ENV === 'development' && module.hot) {
//   module.hot.accept('./rootReducer', () => {
//     const newRootReducer = require('./rootReducer').default
//     store.replaceReducer(newRootReducer)
//   })
// }

export type AppDispatch = typeof store.dispatch;

export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export default store;
