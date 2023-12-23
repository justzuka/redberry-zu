import React from "react";
import "./FilterItem.css";
import "../../index.css";
import { useAppContext } from "../../context";

export const FilterItem = ({
  title,
  backgroundColor,
  textColor,
  isInteractive,
  isSelected,
  index,
}) => {
  const { setCategorySelected } = useAppContext();

  return (
    <div
      onClick={() => setCategorySelected(index)}
      className={`filter-item ${
        isInteractive ? "filter-item-interactive" : ""
      } ${isSelected ? "filter-item-selected" : ""}`}
      style={{
        backgroundColor: `${backgroundColor}14`,
        color: backgroundColor,
      }}
    >
      {title}
    </div>
  );
};
