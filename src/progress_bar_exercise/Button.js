import React from "react";
import "./Button.scss";

const Button = ({ callback, className, label }) => {
  return (
    <button className={className} onClick={callback}>
      {label}
    </button>
  );
};

export default Button;
