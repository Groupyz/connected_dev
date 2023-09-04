import "./styles/Checkbox.css";
import { useState } from "react";

const Checkbox = ({ label, selectedGroups, setSelectedGroups }) => {
  const isChecked = selectedGroups.includes(label);
  const handleCheckboxChange = () => {
    setSelectedGroups((prevSelectedGroups) => {
      if (isChecked) {
        return prevSelectedGroups.filter((group) => group !== label);
      } else {
        return [...prevSelectedGroups, label];
      }
    });
  };

  return (
    <div className="checkbox-wrapper">
      <label>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={handleCheckboxChange}
          className={isChecked ? "checked" : ""}
        />
      </label>
    </div>
  );
};
export default Checkbox;
