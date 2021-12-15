import React, { useEffect, useState } from "react";
import Exercise from "../exercise/Exercise";

import Button from "./Button";
import ProgressBar from "./ProgressBar";
import { RequestStatus } from "./request-status";
import useInterval from "./hooks/useInterval";
import './ProgressBarExercise.scss';

const ProgressBarExercise = () => {
  return (
    <div className="progress-bar-exercise">
      <Exercise
        solution={<Solution />}
        specsUrl="https://github.com/SpiffInc/spiff_react_exercises/issues/1"
        title="Progress Bar Exercise"
      />
    </div>
  );
};

export default ProgressBarExercise;

// ----------------------------------------------------------------------------------

// I'll have to admit, I've never had to fake a timer before. Expect jankiness.
const Solution = () => {
  const [requestStatus, setRequestStatus] = useState(RequestStatus.INACTIVE);
  const [timer, setTimer] = useState(null);
  const [progressBarFadeTimer, setProgressBarFadeTimer] = useState(null);
  const [delay, setDelay] = useState(null);
  const [useBreakpoints, setUseBreakpoints] = useState(true);

  const DECREMENT = 100;
  const REQUEST_TIMER = 15000;
  const PROGRESS_FADE_TIMER = 3000;

  const percentageFilled = () => {
    switch (requestStatus) {
      case RequestStatus.ACTIVE:
        return 100 - ((timer / REQUEST_TIMER) * 100);
      case RequestStatus.STARTING:
        return 0;
      case RequestStatus.INACTIVE:
        return REQUEST_TIMER ? 100 - ((REQUEST_TIMER) * 100) : null;
      case RequestStatus.FINISHED:
        return 100;
      case RequestStatus.STALLED:
        return 100 - ((timer / REQUEST_TIMER) * 100);
      default:
        return 0;
    }
  };

  // Interval hook for the progress bar while active
  useInterval(() => {
    // Set the request status as active if not already
    setRequestStatus(RequestStatus.ACTIVE);
    setTimer(timer - DECREMENT);
  }, (requestStatus === RequestStatus.ACTIVE || requestStatus === RequestStatus.STARTING) ? delay : null);

  // Interval hook for the fading away
  useInterval(() => {
    setProgressBarFadeTimer(progressBarFadeTimer - 1000);
  }, requestStatus === RequestStatus.FINISHED ? 1000 : null);

  // Fade the progress bar away
  useEffect(() => {
    if (progressBarFadeTimer <= 0 && requestStatus === RequestStatus.FINISHED) {
      setRequestStatus(RequestStatus.INACTIVE);
    }
  }, [progressBarFadeTimer, requestStatus]);

  const handleStartClick = () => {
    if (requestStatus === RequestStatus.INACTIVE || requestStatus === RequestStatus.FINISHED) {
      setRequestStatus(RequestStatus.STARTING);
      setDelay(DECREMENT);
      setTimer(REQUEST_TIMER);
    }
  };

  const handleFinishRequestClick = () => {
    setRequestStatus(RequestStatus.FINISHED);
    setProgressBarFadeTimer(PROGRESS_FADE_TIMER);
  };

  // Watch the timer hitting 0, finish the request when it does
  useEffect(() => {
    if (percentageFilled() >= 90 && requestStatus === RequestStatus.ACTIVE) {
        setRequestStatus(RequestStatus.STALLED);
    }
    if (timer <= 0 && requestStatus === RequestStatus.ACTIVE) {
      setRequestStatus(RequestStatus.FINISHED);
      setTimer(null);
    }
    if (requestStatus === RequestStatus.FINISHED) {
        setTimer(null);
    }
  }, [requestStatus, timer]);

  const handleCheckboxCheck = () => {
    setUseBreakpoints(!breakpoints);
  };

  // Sample breakpoints for the progress bar
  const breakpoints = useBreakpoints ? [1,2,3,4,5,6,7,8,9,10,20,50,60,75,80,85,90,91,92,100] : null;

  return (
    <div className="canvas">
      <ProgressBar requestStatus={requestStatus} percentageFilled={percentageFilled()} breakpoints={breakpoints}/>
      <Button
        callback={() => handleStartClick()}
        className={`canvas__button canvas__request-button canvas__request-button--${requestStatus}`}
        label={`${requestStatus === RequestStatus.ACTIVE || requestStatus === RequestStatus.STARTING || requestStatus === RequestStatus.STALLED ? "Loading..." : "Start Request"}`}
      />
      {(requestStatus === RequestStatus.ACTIVE || requestStatus === RequestStatus.STALLED) &&
        <Button
          callback={() => handleFinishRequestClick()}
          className={`canvas__button canvas__finish-button canvas__finish-button--${requestStatus}`}
          label="Finish Request"
        />
      }
      <label>
        Use Breakpoints
      <input
        className="canvas__checkbox"
        checked={useBreakpoints}
        onChange={() => handleCheckboxCheck()}
        type="checkbox"
      />
      </label>
    </div>
  );
};
