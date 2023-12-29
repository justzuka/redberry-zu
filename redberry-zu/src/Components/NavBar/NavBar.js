import React, { useState } from "react";
import { ReactComponent as REDBERRY_LOGO } from "../../Image_SVG_Resources/REDBERRY_LOGO.svg";
import "./NavBar.css";
import { Button } from "../Button/Button";
import LoginPopup from "../Popup/LoginPopup";
import { useAppContext } from "../../context";
import { useNavigate, useLocation } from "react-router-dom";

export const NavBar = () => {
  const [showLogin, setShowLogin] = useState(false);
  const { user } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigateToAddBlog = () => {
    navigate(`/addBlog`);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  const handleNavigateToHome = () => {
    navigate(`/`);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };

  return (
   
      <div
        className={`navbar-container ${
          location.pathname === "/addBlog" ? "navbar-center" : ""
        }`}
      >
        {showLogin ? (
          <LoginPopup closePopup={() => setShowLogin(!showLogin)} />
        ) : (
          ""
        )}
        <REDBERRY_LOGO className="redberry-logo" />
        {location.pathname === "/addBlog" ? (
          <></>
        ) : (
          <Button
            text={user === "" ? "შესვლა" : "დაამატე ბლოგი"}
            onClick={
              user === ""
                ? () => {
                    setShowLogin(!showLogin);
                    handleNavigateToHome();
                  }
                : handleNavigateToAddBlog
            }
          ></Button>
        )}
      </div>
  );
};
