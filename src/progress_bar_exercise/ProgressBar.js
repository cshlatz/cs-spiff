import React from "react";
import "./ProgressBar.scss";

const ProgressBar = ({ requestStatus, percentageFilled }) => {
  return (
    <div className="canvas__progress-bar">
      <div
        className={`canvas__progress-indicator canvas__progress-indicator--${requestStatus}`}
        style={{width: percentageFilled + '%'}}
      />
    </div>
  );
}

export default ProgressBar;
