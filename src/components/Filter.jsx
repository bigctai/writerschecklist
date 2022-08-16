import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { CheckBox } from "./CheckBox/CheckBox";

export const Filter = ({
  label,
  onClickArrow,
  onClickOptions,
  click,
  options,
}) => {
  return (
    <div>
      <h3>
        {label}
        <span onClick={onClickArrow}>
          <FontAwesomeIcon
            className="arrow"
            icon={click ? faAngleDown : faAngleRight}
          ></FontAwesomeIcon>
        </span>
      </h3>
      <ul className={`list ${click ? "display" : "none"}`}>
        {options.map((option) => (
          <CheckBox
            label={option}
            key={option}
            onClick={onClickOptions(option)}
          >
            {option}
          </CheckBox>
        ))}
      </ul>
    </div>
  );
};
