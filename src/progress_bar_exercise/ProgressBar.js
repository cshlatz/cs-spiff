import React from "react";
import "./ProgressBar.scss";

const ProgressBar = ({ percentageFilled }) => {
  return (
    <div className="canvas__progress-bar">
      <div
        className="canvas__progress-indicator"
        style={{width: percentageFilled + '%'}}
      />
    </div>
  );
}

export default ProgressBar;
