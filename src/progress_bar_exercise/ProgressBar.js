import React from "react";
import PropTypes from 'prop-types';
import "./ProgressBar.scss";

import { calculateWidthByBreakpoints } from './utils/progressBarUtils';

const ProgressBar = ({ requestStatus, percentageFilled, breakpoints }) => {

  const calculatedWidth = breakpoints ? calculateWidthByBreakpoints(percentageFilled, breakpoints) : percentageFilled;

  return (
    <div className="canvas__progress-bar">
      <div
        className={`canvas__progress-indicator canvas__progress-indicator--${requestStatus}`}
        style={{width: calculatedWidth + '%'}}
      />
    </div>
  );
}

ProgressBar.propTypes = {
  requestStatus: PropTypes.string.isRequired,
  percentageFilled: PropTypes.number.isRequired,
  breakpoints: PropTypes.arrayOf(PropTypes.number)
};

export default ProgressBar;
