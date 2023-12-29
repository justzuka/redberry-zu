import React, { useEffect, useState } from "react";
import "./AddBlogPage.css";
import { ReactComponent as BACK_ARROW } from "../../Image_SVG_Resources/BackArrow.svg";
import { useNavigate } from "react-router-dom";
import "../BlogPage/BlogPage.css";
import InputField from "../InputField/InputField";
import { useAppContext } from "../../context";
import ImageUploader from "../ImageUploader/ImageUploader";
import CustomDatePicker from "../DatePicker/CustomDatePicker";
import CategorySelector from "../CategorySelector/CategorySelector";
import EmailField from "../Popup/EmailField";
import { Button } from "../Button/Button";
import { AddBlog } from "../../FetchInformation";
import LoginPopup from "../Popup/LoginPopup";

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
  const [title, setTitle] = useState("");
  const [titleError, setTitleError] = useState(true);

  const [author, setAuthor] = useState("");
  const [authorError, setAuthorError] = useState(true);

  const [description, setDescription] = useState(false);
  const [descriptionError, setDescriptionError] = useState(true);

  const [date, setDate] = useState(null);
  const [dateError, setDateError] = useState(false);

  const [categories, setCategories] = useState([]);
  const [categoriesError, setCategoriesError] = useState(true);

  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);

  const [image, setImage] = useState(null);

  const [breakDefault, setBreakDefault] = useState(false);

  const [done, setDone] = useState(false);

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
  }, [user]);

  const handleSubmit = () => {
    if (!breakDefault) {
      setBreakDefault(true);
    }
    if (canSubmit()) {
      HandleAddBlog();
    }
  };

  const canSubmit = () => {
    return (
      !titleError &&
      title !== "" &&
      !descriptionError &&
      description !== "" &&
      !authorError &&
      author !== "" &&
      !categoriesError &&
      categories.length !== 0 &&
      !emailError &&
      !dateError &&
      date !== null &&
      image !== null
    );
  };

  const HandleAddBlog = () => {
    const blogData = new FormData();
    blogData.append("title", title);
    blogData.append("description", description);
    blogData.append("image", image);
    blogData.append("author", author);
    const tmp = date.toLocaleDateString().split("/");
    const dateString = tmp[2] + "-" + tmp[0] + "-" + tmp[1];
    blogData.append("publish_date", dateString);
    blogData.append("categories", JSON.stringify(categories));
    blogData.append("email", email);

    // console.log("title:", title);
    // console.log("description:", description);
    // console.log("image:", image);
    // console.log("author:", author);
    // console.log("publish_date:", date.toISOString().split('T')[0]);
    // console.log("categories:", JSON.stringify(categories));
    // console.log("email:", email);
    // console.log(blogData)

    AddBlog(blogData)
      .then((answer) => {
        if (answer) {
          setDone(true);
        }
        else{
          alert("try again")
        }
      })
      .catch((error) => console.error("Error:", error));


  };

  return (
    <>
      {done ? <LoginPopup addBlog={true} /> : ""}

      <div className="add-blog-page-container">
        <div className="back-home" onClick={handleNavigateToHome}>
          <BACK_ARROW className={`back-arrow`} />
        </div>

        <div className="add-blog-container">
          <div className="add-blog-text">ბლოგის დამატება</div>
          <ImageUploader setValueParent={setImage} />
          <div className="author-title-row">
            <InputField
              placeholder={"შეიყვანეთ ავტორი"}
              labe_text={"ავტორი *"}
              validations={authorValidations}
              setValueParent={setAuthor}
              setErrorParent={setAuthorError}
              breakDefault={breakDefault}
            />
            <InputField
              placeholder={"შეიყვანეთ სათაური"}
              labe_text={"სათაური *"}
              validations={titleValidations}
              setValueParent={setTitle}
              setErrorParent={setTitleError}
              breakDefault={breakDefault}
            />
          </div>
          <InputField
            placeholder={"შეიყვანეთ აღწერა"}
            labe_text={"აღწერა *"}
            validations={descriptionValidations}
            isTextArea={true}
            setValueParent={setDescription}
            setErrorParent={setDescriptionError}
            breakDefault={breakDefault}
          />
          <div className="date-category-row">
            <CustomDatePicker
              setValueParent={setDate}
              setErrorParent={setDateError}
              breakDefault={breakDefault}
            />
            <CategorySelector
              label_text={"აირჩიეთ კატეგორია"}
              setValueParent={setCategories}
              setErrorParent={setCategoriesError}
              breakDefault={breakDefault}
            />
          </div>

          <div className="date-category-row">
            <EmailField
              setValueParent={setEmail}
              setErrorParent={setEmailError}
              addBlog={true}
            />
          </div>

          <div className="last-row">
            <Button
              text={"გამოქვეყნება"}
              addBlog={true}
              isDisabled={!canSubmit()}
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default AddBlogPage;
