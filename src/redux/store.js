import { configureStore } from '@reduxjs/toolkit';
import clockSlice from './clockSlice';

const store = configureStore({
  reducer: {
    clock: clockSlice,
  },
});

export default store;
