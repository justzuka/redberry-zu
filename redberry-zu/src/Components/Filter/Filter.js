import React from "react";
import "./Filter.css";
import { FilterItem } from "./FilterItem";
import { useAppContext } from "../../context";

export const Filter = ({ categories, selectedCategories, isInteractive }) => {
  const { setCategorySelected } = useAppContext();
  return (
    <div className="main-filter-container">
      <div className="filter-container">
        {categories.map((category, index) => {
          return (
            <FilterItem
              isSelected={selectedCategories === undefined ? false : selectedCategories[index]}
              isInteractive={isInteractive}
              key={category.id}
              backgroundColor={category.background_color}
              textColor={category.text_color}
              title={category.title}
              index={index}
              onClick={() => setCategorySelected(index)}
            />
          );
        })}
      </div>
      <div className="left-gradient-div"></div>
      <div className="right-gradient-div"></div>
    </div>
  );
};

Filter.defaultProps = {
  isInteractive: false,
};
