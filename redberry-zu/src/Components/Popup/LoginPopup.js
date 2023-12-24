import React from "react";
import "./LoginPopup.css";
import { ReactComponent as X } from "../../Image_SVG_Resources/x.svg";
import EmailField from "./EmailField";
import { Button } from "../Button/Button";

const LoginPopup = ({ closePopup }) => {
  return (
    <div className="popup-background">
      <div className="popup-container">
        <div className="x-back-button-container">
          <div className="x-back-button" onClick={closePopup}>
            <X className="x-back-icon" />
          </div>
        </div>
        <div className="login-text">შესვლა</div>
        <EmailField />
        <Button isFullWidth={true} text={'შესვლა'} />
      </div>
    </div>
  );
};

export default LoginPopup;
