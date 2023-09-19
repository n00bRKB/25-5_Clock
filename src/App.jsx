import { useState, useEffect } from "react";

function App() {
  const [lengthBreak, setBreak] = useState(5);
  const [lengthSession, setSession] = useState(25);
  const [start, setStart] = useState(false);
  const [type, setType] = useState("Session");
  const [displayTime, setDisplayTime] = useState(25 * 60);

  const handleBreakDecrement = () => {
    if (lengthBreak > 1) {
      setBreak(lengthBreak - 1);
    }
  };

  const handleBreakIncrement = () => {
    if (lengthBreak < 60) {
      setBreak(lengthBreak + 1);
    }
  };

  const handleSessionDecrement = () => {
    if (lengthSession > 1) {
      setSession(lengthSession - 1);
      setDisplayTime(displayTime - 60);
    }
  };

  const handleSessionIncrement = () => {
    if (lengthSession < 60) {
      setSession(lengthSession + 1);
      setDisplayTime(displayTime + 60);
    }
  };

  const formatTime = () => {
    const minutes = Math.floor(displayTime / 60);
    const seconds = displayTime % 60;
    return (
      (minutes < 10 ? "0" + minutes : minutes) +
      ":" +
      (seconds < 10 ? "0" + seconds : seconds)
    );
  };

  const timeout = setTimeout(() => {
    if (displayTime && start) {
      setDisplayTime(displayTime - 1);
    }
  }, 1000);

  const handleStart = () => {
    clearTimeout(timeout);
    setStart(!start);
  };

  const handleReset = () => {
    clearTimeout(timeout);
    setStart(false);
    setDisplayTime(25 * 60);
    setBreak(5);
    setSession(25);
    setType("Session");
    const alarm = document.getElementById("beep");
    alarm.pause();
    alarm.currentTime = 0;
  };

  useEffect(() => {
    if (start) {
      timeout;
      const alarm = document.getElementById("beep");
      if (!displayTime && type === "Session") {
        const tempTimeout = setTimeout(() => {
          setDisplayTime(lengthBreak * 60);
          setType("Break");
          alarm.play();
        }, 1000);
        tempTimeout;
      }
      if (!displayTime && type === "Break") {
        const tempTimeout = setTimeout(() => {
          setDisplayTime(lengthSession * 60);
          setType("Session");
          alarm.pause();
          alarm.currentTime = 0;
        }, 1000);
        tempTimeout;
      }
    } else {
      clearTimeout(timeout);
    }
  }, [start, displayTime, timeout]);

  const title = type === "Session" ? "Session" : "Break";

  return (
    <div className="container">
      <h1>25 + 5 Clock</h1>
      <div className="length-control">
        <div className="break-control">
          <div id="break-label">Break Length</div>
          <button
            disabled={start}
            onClick={handleBreakDecrement}
            className="btn-level"
            id="break-decrement"
          >
            -
          </button>
          <div id="break-length">{lengthBreak}</div>
          <button
            disabled={start}
            onClick={handleBreakIncrement}
            className="btn-level"
            id="break-increment"
          >
            +
          </button>
        </div>
        <div className="session-control">
          <div id="session-label">Session Length</div>
          <button
            onClick={handleSessionDecrement}
            className="btn-level"
            id="session-decrement"
          >
            -
          </button>
          <div id="session-length">{lengthSession}</div>
          <button
            onClick={handleSessionIncrement}
            className="btn-level"
            id="session-increment"
          >
            +
          </button>
        </div>
      </div>
      <div className="timer-container">
        <div id="timer-label">{title}</div>
        <div id="time-left" className="timer">
          {formatTime()}
        </div>
      </div>
      <div className="start-reset">
        <button id="start_stop" className="start" onClick={handleStart}>
          Start/Pause
        </button>
        <button id="reset" className="reset" onClick={handleReset}>
          Reset
        </button>
      </div>
      <audio
        id="beep"
        preload="auto"
        src="https://raw.githubusercontent.com/freeCodeCamp/cdn/master/build/testable-projects-fcc/audio/BeepSound.wav"
      />
    </div>
  );
}

export default App;
