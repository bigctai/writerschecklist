import React from "react";
import "./CheckBox.css";

export const CheckBox = ({ label, onClick, checked }) => {
  return (
    <div className="check">
      <input
        type="checkbox"
        className="chkbx"
        id="cb"
        onClick={onClick}
        defaultChecked={checked}
      />
      <label className="lbl" for="cb">
        {label}
      </label>
    </div>
  );
};
