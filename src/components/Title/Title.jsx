import React from "react";
import "./Title.css";

export const Title = ({ titleName, color, size }) => {
  return <div className={`title ${color} ${size}`}>{titleName}</div>;
};

export default Title;
