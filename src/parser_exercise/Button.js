import React from "react";
import PropTypes from 'prop-types';

import "./Button.scss";

const Button = ({ callback, className, label }) => {
  return (
    <button className={className} onClick={callback}>
      {label}
    </button>
  );
};

Button.propTypes = {
  callback: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  label: PropTypes.string
};

export default Button;
