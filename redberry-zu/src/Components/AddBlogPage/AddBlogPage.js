import React, { useEffect } from "react";
import "./AddBlogPage.css";
import { ReactComponent as BACK_ARROW } from "../../Image_SVG_Resources/BackArrow.svg";
import { useNavigate } from "react-router-dom";
import "../BlogPage/BlogPage.css";
import InputField from "../InputField/InputField";
import { useAppContext } from "../../context";

const authorValidations = [
  {
    text: "მინიმუმ 4 სიმბოლო",
    validate: (value) => {
      const symbolsOnly = value.replace(/\s/g, ""); // Remove spaces
      return symbolsOnly.length >= 4;
    },
  },
  {
    text: "მინიმუმ ორი სიტყვა",
    validate: (value) => {
      const words = value.trim().split(/\s+/);
      return words.length >= 2;
    },
  },
  {
    text: "მხოლოდ ქართული სიმბოლოები",
    validate: (value) => {
      const georgianLettersRegex = /^[\u10D0-\u10FA\s]+$/;
      return georgianLettersRegex.test(value);
    },
  },
];

const titleValidations = [
  {
    text: "მინიმუმ 2 სიმბოლო",
    validate: (value) => {
      const symbolsOnly = value.replace(/\s/g, ""); // Remove spaces
      return symbolsOnly.length >= 2;
    },
  },
];


const descriptionValidations = [
  {
    text: "მინიმუმ 4 სიმბოლო",
    validate: (value) => {
      const symbolsOnly = value.replace(/\s/g, ""); // Remove spaces
      return symbolsOnly.length >= 4;
    },
  },
];

const AddBlogPage = () => {
  const navigate = useNavigate();
  const { user } = useAppContext();
  const handleNavigateToHome = () => {
    navigate(`/`);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };
  useEffect(() => {
    if (user === "") {
      handleNavigateToHome();
    }
  }, []);

  return (
    <div className="add-blog-page-container">
      <div className="back-home" onClick={handleNavigateToHome}>
        <BACK_ARROW className={`back-arrow`} />
      </div>

      <div className="add-blog-container">
        <div className="add-blog-text">ბლოგის დამატება</div>
        <div className="author-title-row">
          <InputField
            placeholder={"შეიყვანეთ ავტორი"}
            labe_text={"ავტორი *"}
            validations={authorValidations}
          />
          <InputField
            placeholder={"შეიყვანეთ სათაური"}
            labe_text={"სათაური *"}
            validations={titleValidations}
          />
        </div>
        <InputField
          placeholder={"შეიყვანეთ აღწერა"}
          labe_text={"აღწერა *"}
          validations={descriptionValidations}
          isTextArea={true}
        />
      </div>
    </div>
  );
};

export default AddBlogPage;
