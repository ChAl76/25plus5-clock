import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  incrementBreak,
  decrementBreak,
  incrementSession,
  decrementSession,
  reset,
  toogleTimer,
  decrementTime,
} from './redux/clockSlice';
import './Clock.scss';

function Clock() {
  const dispatch = useDispatch();
  const timeRef = useRef(null);

  const { breakLength, sessionLength, timeLeft, isRunning, timerLabel } =
    useSelector((state) => state.clock);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const handleStartStop = () => {
    if (isRunning) {
      clearInterval(timeRef.current);
    } else {
      timeRef.current = setInterval(() => dispatch(decrementTime()), 1000);
    }
    dispatch(toogleTimer());
  };

  const handleReset = () => {
    clearInterval(timeRef.current);
    dispatch(reset());
    const audio = document.getElementById('beep');
    audio.pause();
    audio.currentTime = 0;
  };

  return (
    <main className="clock">
      <div id="break-label" className="clock__label">
        Break Length
      </div>
      <div id="session-label" className="clock__label">
        Session Length
      </div>

      <div className="clock__controls">
        <button
          id="break-decrement"
          className="btn-level"
          onClick={() => dispatch(decrementBreak())}
          disabled={isRunning}
        >
          <i className="fas fa-arrow-down fa-2x"></i>
        </button>
        <span id="break-length" className="clock__value">
          {breakLength}
        </span>
        <button
          id="break-increment"
          className="clock__button"
          onClick={() => dispatch(incrementBreak())}
          disabled={isRunning}
        >
          +
        </button>

        <button
          id="session-decrement"
          className="clock__button"
          onClick={() => dispatch(decrementSession())}
          disabled={isRunning}
        >
          -
        </button>
        <span id="session-length" className="clock__value">
          {sessionLength}
        </span>
        <button
          id="session-increment"
          className="clock__button"
          onClick={() => dispatch(incrementSession())}
          disabled={isRunning}
        >
          +
        </button>
      </div>

      <div className="clock__timer">
        <div id="timer-label" className="clock__label">
          {timerLabel}
        </div>
        <div id="time-left" className="clock__time">
          {formatTime(timeLeft)}
        </div>
      </div>

      <div className="clock__actions">
        <button
          id="start_stop"
          className="clock__button"
          onClick={handleStartStop}
        >
          Start/Stop
        </button>
        <button id="reset" className="clock__button" onClick={handleReset}>
          Reset
        </button>
      </div>

      <audio
        id="beep"
        src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav"
        preload="auto"
      ></audio>
    </main>
  );
}

export default Clock;
