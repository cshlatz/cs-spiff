import React, { useEffect, useState } from "react";
import Exercise from "../exercise/Exercise";

import Button from "./Button";
import ProgressBar from "./ProgressBar";
import useInterval from "./hooks/useInterval";

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

const Solution = () => {
  const [requestActive, setRequestActive] = useState();
  const [timer, setTimer] = useState(null);
  const [delay, setDelay] = useState(null);

  useInterval(() => {
    setTimer(timer - 1000);
  }, requestActive? delay : null);

  // I'll have to admit, I've never had to fake a timer before. Expect jankiness.
  const handleClick = () => {
    if (!requestActive) {
        setRequestActive(true);
        setDelay(1000);
        setTimer(15000);
    }
  };

  // Watch the timer hitting 0, finish the request when it does
  useEffect(() => {
    if (timer <= 0) {
      setRequestActive(false);
      setTimer(null);
    }
  }, [timer]);

  const percentageFilled = () => {
    return requestActive ? 100 - ((timer / 15000) * 100) : 0;
  };

  return (
    <div>
      <ProgressBar percentageFilled={percentageFilled()} />
      <Button
        callback={() => handleClick()}
        className={`canvas__button canvas__button--${requestActive ? "active" : "inactive"}`}
        label={`${requestActive ? "Loading..." : "Start Request"}`}
      />
    </div>
  );
};
