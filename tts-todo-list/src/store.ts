import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query'
import { useDispatch, useSelector, type TypedUseSelectorHook } from 'react-redux';
import credentialsReducer from './components/superSafeCredentialsSlice';
import departureTimeReducer from "./components/departureTimeSlice";

export const store = configureStore({
  reducer: {
    credentials: credentialsReducer,
    departureTime: departureTimeReducer
  }
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
