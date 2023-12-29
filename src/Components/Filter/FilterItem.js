import React from "react";
import "./FilterItem.css";
import "../../index.css";
import { ReactComponent as X } from "../../Image_SVG_Resources/x_white.svg";

export const FilterItem = ({
  title,
  backgroundColor,
  textColor,
  isInteractive,
  isSelected,
  index,
  onClick,
  hasMargin,
  correctColors,
  hasX,
}) => {
  return (
    <div
      onClick={isInteractive ? onClick : () => {}}
      className={`filter-item ${hasMargin ? "filter-item-margin" : ""} ${
        isInteractive ? "filter-item-interactive" : ""
      } ${isSelected ? "filter-item-selected" : ""}`}
      style={{
        backgroundColor: `${backgroundColor}${correctColors ? "" : "14"}`,
        color: `${correctColors ? textColor : backgroundColor}`,
      }}
    >
      {hasX ? <>{title} <X className="x-filter-item" /></> : title}
    </div>
  );
};
