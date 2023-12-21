import React from "react";
import "./Filter.css";
import { useAppContext } from "../../context";
import { FilterItem } from "./FilterItem";

export const Filter = () => {
  const { categories } = useAppContext();
  return (
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
  );
};
