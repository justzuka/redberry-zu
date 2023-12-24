import React, { useState } from "react";
import "./EmailField.css";
import { useFieldErrorContext } from "../../FieldErrorContext";
import { Button } from "../Button/Button";
import { ReactComponent as INFO_CIRCLE } from "../../Image_SVG_Resources/info-circle.svg";
import { useAppContext } from "../../context";

const EmailField = () => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { checkForEmailErrorLogin } = useFieldErrorContext();
  const { LoginUser, user } = useAppContext();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleClick = async () => {
    const answer = await checkForEmailErrorLogin(email, setErrorMessage);
    if (answer) {
      LoginUser(email);
    }
  }

  

  return (
    <div className="email-field-container">
      <label className="email-label">ელ-ფოსტა</label>
      <input
        className={`${
          errorMessage !== "" ? "email-field-error" : "email-field"
        }`}
        type="email"
        value={email}
        onChange={handleChange}
        placeholder="Example@redberry.ge"
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleClick();
          }
        }}
      />
      {errorMessage !== "" ? (
        <div className="email-login-error-container">
          <INFO_CIRCLE className="info-circle" />
          <div className="email-login-error-text">{errorMessage}</div>
        </div>
      ) : (
        ""
      )}
      <Button
        isFullWidth={true}
        text={"შესვლა"}
        onClick={handleClick}
      />{" "}
    </div>
  );
};

export default EmailField;
