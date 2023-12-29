import React from "react";
import "./Button.css";

export const Button = ({ text, onClick, isFullWidth, addBlog, isDisabled }) => {
  return (
    <div
      className={`${isDisabled ? "button-disabled" : "button"} ${
        addBlog ? "add-blog-width" : ""
      } ${isFullWidth ? "button-full-width" : ""}`}
      onClick={onClick}
    >
      {text}
    </div>
  );
};
