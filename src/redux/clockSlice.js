import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sessionLength: 25,
  breakLength: 5,
  timer: 25 * 60,
  timeLeft: 1500,
  timerLabel: 'Session',
  isRunning: false,
  currentMode: 'session',
};

const clockSlice = createSlice({
  name: 'clock',
  initialState,
  reducers: {
    incrementBreak: (state) => {
      if (state.breakLength < 60) {
        state.breakLength += 1;
      }
    },
    decrementBreak: (state) => {
      if (state.breakLength > 1) {
        state.breakLength -= 1;
      }
    },
    incrementSession: (state) => {
      if (state.sessionLength < 60) {
        state.sessionLength += 1;
        state.timeLeft = state.sessionLength * 60;
      }
    },
    decrementSession: (state) => {
      if (state.sessionLength > 1) {
        state.sessionLength -= 1;
        state.timeLeft = state.sessionLength * 60;
      }
    },
    reset: (state) => {
      state.sessionLength = 25;
      state.breakLength = 5;
      state.timeLeft = 25 * 60;
      state.timerLabel = 'Session';
      state.isRunning = false;
      state.currentMode = 'session';
    },
    toogleTimer: (state) => {
      state.isRunning = !state.isRunning;
    },
    decrementTime: (state) => {
      if (state.timeLeft > 0) {
        state.timeLeft -= 1; // Decrement the timer
      } else {
        // When timer reaches 00:00
        const audio = document.getElementById('beep');
        audio.play();

        if (state.currentMode === 'session') {
          state.currentMode = 'break';
          state.timerLabel = 'Break';
          state.timeLeft = state.breakLength * 60; // Switch to break time
        } else {
          state.currentMode = 'session';
          state.timerLabel = 'Session';
          state.timeLeft = state.sessionLength * 60; // Switch to session time
        }
      }
    },
  },
});

export const {
  incrementBreak,
  decrementBreak,
  incrementSession,
  decrementSession,
  reset,
  toogleTimer,
  decrementTime,
} = clockSlice.actions;

export default clockSlice.reducer;
