import React, { useEffect, useState } from "react";
import "./EmailField.css";
import { Button } from "../Button/Button";
import { ReactComponent as INFO_CIRCLE } from "../../Image_SVG_Resources/info-circle.svg";
import { useAppContext } from "../../context";
import { Login } from "../../FetchInformation";

const EmailField = ({ addBlog, setValueParent, setErrorParent }) => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { LoginUser, user } = useAppContext();

  const checkForEmailErrorLogin = async () => {
    switch (true) {
      case email === "":
        setErrorMessage("გთხოვთ შეიყვანოთ ელ-ფოსტა");

        return false;

      case !email.endsWith("@redberry.ge"):
        setErrorMessage("ელ-ფოსტა უნდა მთავრდებოდეს @redberry.ge");

        return false;

      default:
        const answer = await Login(email);
        if (!answer) {
          setErrorMessage("ელ-ფოსტა არ მოიძებნა");
        } else {
          setErrorMessage("");
        }
        return answer;
    }
  };

  useEffect(() => {
    const storedString = localStorage.getItem("emailField");
    if (storedString) {
      handleChange({ target: { value: storedString } });
    }
  }, []);

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  useEffect(() => {
    if (addBlog) {
      checkEndsWithRedberry();
    }

    if (setValueParent !== undefined) {
      setValueParent(email);
    }
    localStorage.setItem("emailField", email);
  }, [email]);

  const checkEndsWithRedberry = () => {
    if (email.endsWith("@redberry.ge") || email === "") {
      setErrorMessage("");
      if (setErrorParent !== undefined) {
        setErrorParent(false);
      }
    } else {
      setErrorMessage("უნდა მთავრდებოდეს @redberry.ge");
      if (setErrorParent !== undefined) {
        setErrorParent(true);
      }
    }
  };

  const handleClick = addBlog
    ? () => {}
    : async () => {
        const answer = await checkForEmailErrorLogin(email, setErrorMessage);
        if (answer) {
          LoginUser(email);
        }
      };

  return (
    <div className={`email-field-container ${addBlog ? "add-blog-width" : ""}`}>
      <label className="email-label">ელ-ფოსტა</label>
      <input
        className={`${
          errorMessage !== ""
            ? "email-field-error"
            : email !== ""
            ? addBlog
              ? "email-field-correct"
              : "email-field"
            : "email-field"
        }`}
        type="email"
        value={email}
        onChange={handleChange}
        placeholder="Example@redberry.ge"
        onKeyDown={
          addBlog
            ? () => {}
            : (e) => {
                if (e.key === "Enter") {
                  handleClick();
                }
              }
        }
      />
      {errorMessage !== "" ? (
        <div className="email-login-error-container">
          <INFO_CIRCLE className="info-circle" />
          <div className="email-login-error-text">{errorMessage}</div>
        </div>
      ) : (
        ""
      )}
      {addBlog ? (
        ""
      ) : (
        <Button isFullWidth={true} text={"შესვლა"} onClick={handleClick} />
      )}
    </div>
  );
};

export default EmailField;
