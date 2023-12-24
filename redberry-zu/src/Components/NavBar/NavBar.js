import React, { useState } from "react";
import { ReactComponent as REDBERRY_LOGO } from "../../Image_SVG_Resources/REDBERRY_LOGO.svg";
import "./NavBar.css";
import { Button } from "../Button/Button";
import LoginPopup from "../Popup/LoginPopup";
import { FieldErrorProvider } from "../../FieldErrorContext";

export const NavBar = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <FieldErrorProvider>
      <div className="navbar-container">
        {showLogin ? (
          <LoginPopup closePopup={() => setShowLogin(!showLogin)} />
        ) : (
          ""
        )}
        <REDBERRY_LOGO className="redberry-logo" />
        <Button
          text={"შესვლა"}
          onClick={() => setShowLogin(!showLogin)}
        ></Button>
      </div>
    </FieldErrorProvider>
  );
};
