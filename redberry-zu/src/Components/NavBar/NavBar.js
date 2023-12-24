import React, { useState } from "react";
import { ReactComponent as REDBERRY_LOGO } from "../../Image_SVG_Resources/REDBERRY_LOGO.svg";
import "./NavBar.css";
import { Button } from "../Button/Button";
import LoginPopup from "../Popup/LoginPopup";
import { FieldErrorProvider } from "../../FieldErrorContext";
import { useAppContext } from "../../context";

export const NavBar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const { user } = useAppContext();

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
          text={user === "" ? "შესვლა" : "დაამატე ბლოგი"}
          onClick={user === "" ? () => setShowLogin(!showLogin) : () => {}}
        ></Button>
      </div>
    </FieldErrorProvider>
  );
};
