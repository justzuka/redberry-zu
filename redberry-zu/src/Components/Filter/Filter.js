import React from "react";
import "./Filter.css";
import { FilterItem } from "./FilterItem";

export const Filter = ({categories}) => {
  
  return (
    <div className="main-filter-container">
      <div className="filter-container">
        {categories.map((category, index) => (
          <FilterItem
            key={category.id}
            backgroundColor={category.background_color}
            textColor={category.text_color}
            title={category.title}
          />
        ))}
      </div>
      <div className="left-gradient-div"></div>
      <div className="right-gradient-div"></div>
    </div>
  );
};
