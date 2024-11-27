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
    <div className="clock__container">
      <header className="fa mb-2 clock__header">
        <h1>25 + 5 Clock</h1>
      </header>
      <main className="clock">
        <div className="clock__controls">
          <div className="clock__control-break">
            <div id="break-label" className="clock__label">
              Break Length
            </div>
            <section className="clock__buttons-break">
              <button
                id="break-decrement"
                className="clock__button"
                onClick={() => dispatch(decrementBreak())}
                disabled={isRunning}
              >
                <i className="fa fa-arrow-down"> </i>
              </button>
              <span id="break-length" className="fa fa-lg clock__value">
                {breakLength}
              </span>
              <button
                id="break-increment"
                className="clock__button"
                onClick={() => dispatch(incrementBreak())}
                disabled={isRunning}
              >
                <i className="fa fa-arrow-up"> </i>
              </button>
            </section>
          </div>

          <div className="clock__control-session">
            <div id="session-label" className="clock__label">
              Session Length
            </div>
            <section className="clock__buttons-session">
              <button
                id="session-decrement"
                className="clock__button"
                onClick={() => dispatch(decrementSession())}
                disabled={isRunning}
              >
                <i className="fa fa-arrow-down"> </i>
              </button>
              <span id="session-length" className="fa fa-lg clock__value">
                {sessionLength}
              </span>
              <button
                id="session-increment"
                className="clock__button"
                onClick={() => dispatch(incrementSession())}
                disabled={isRunning}
              >
                <i className="fa fa-arrow-up"> </i>
              </button>
            </section>
          </div>
        </div>

        <div className="clock__timer">
          <div id="timer-label" className="clock__label">
            <h2>{timerLabel}</h2>
          </div>
          <div id="time-left" className="clock__time">
            {formatTime(timeLeft)}
          </div>
        </div>

        <div className="clock__actions">
          <button
            id="start_stop"
            className="clock__button-action"
            onClick={handleStartStop}
          >
            <i className="fa fa-play fa-lg "></i>
            <i className="fa fa-pause fa-lg "></i>
          </button>
          <button
            id="reset"
            className="clock__button-action"
            onClick={handleReset}
          >
            <i className="fa fa-refresh fa-lg"></i>
          </button>
        </div>

        <audio
          id="beep"
          src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav"
          preload="auto"
        ></audio>
      </main>
      <footer className="clock__footer">
        Created By <br />
        <a
          href="https://github.com/ChAl76"
          target="_blank"
          rel="noreferrer"
          className="clock__author-link"
        >
          Alexander Chorny
        </a>
      </footer>
    </div>
  );
}

export default Clock;
