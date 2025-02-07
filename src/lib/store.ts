import { configureStore } from '@reduxjs/toolkit';
import questionReducer from './features/question/questionSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      question: questionReducer
    }
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
