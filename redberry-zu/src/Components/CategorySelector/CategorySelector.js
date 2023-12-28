import React, { useEffect, useState } from "react";
import "./CategorySelector.css";
import { FilterItem } from "../Filter/FilterItem";
import { useAppContext } from "../../context";

import { ReactComponent as ARROW_DOWN } from "../../Image_SVG_Resources/arrow-down.svg";
const CategorySelector = ({ label_text }) => {
  const { categories } = useAppContext();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [isError, setIsError] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    if (!isStarted) {
      return;
    }
    if (selectedCategories.length === 0) {
      setIsError(true);
    } else {
      setIsError(false);
    }
  }, [selectedCategories]);
  const handleCategorySelect = (category) => {
    if (!isStarted) {
      setIsStarted(true);
    }
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  return (
    <div className="category-selector-container">
      <label className="input-label">{label_text} *</label>
      <div
        className={`add-blog-category-selector ${
          isStarted
            ? isError
              ? "add-blog-category-selector-error"
              : "add-blog-category-selector-correct"
            : isDropdownOpen
            ? "add-blog-category-selector-focus"
            : ""
        }`}
      >
        <div className={`add-blog-selected-categories `}>
          {selectedCategories.length === 0
            ? "აირჩიეთ კატეგორია"
            : selectedCategories.map((category, index) => (
                <FilterItem
                  isInteractive={true}
                  key={category.id}
                  backgroundColor={category.background_color}
                  textColor={category.text_color}
                  title={category.title}
                  index={index}
                  onClick={() => handleCategorySelect(category)}
                  hasMargin={true}
                  correctColors={true}
                  hasX={true}
                />
              ))}
        </div>
        <div className="drop-down-button" onClick={toggleDropdown}>
          <ARROW_DOWN className="drop-down-arrow-down" />
        </div>

        {isDropdownOpen && (
          <div className="add-blog-category-dropdown">
            {selectedCategories.map((category, index) => (
              <FilterItem
                isInteractive={true}
                key={category.id}
                backgroundColor={category.background_color}
                textColor={category.text_color}
                title={category.title}
                index={index}
                onClick={() => handleCategorySelect(category)}
                hasMargin={true}
                correctColors={true}
              />
            ))}
            {categories
              .filter((category) => !selectedCategories.includes(category))
              .map((category, index) => (
                <FilterItem
                  isInteractive={true}
                  key={category.id}
                  backgroundColor={category.background_color}
                  textColor={category.text_color}
                  title={category.title}
                  index={index}
                  onClick={() => handleCategorySelect(category)}
                  hasMargin={true}
                />
              ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategorySelector;
