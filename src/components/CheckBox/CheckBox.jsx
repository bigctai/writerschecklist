import React from "react";
import "./CheckBox.css";

export const CheckBox = ({ label, onClick, id }) => {
  return (
    <div className="check">
      <input type="checkbox" className="chkbx" id="cb" onClick={onClick} />
      <label className="lbl" for="cb">
        {label}
      </label>
    </div>
  );
};
