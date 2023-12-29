import React from "react";
import "./LoginPopup.css";
import { ReactComponent as X } from "../../Image_SVG_Resources/x.svg";
import { ReactComponent as TICK_CIRCLE } from "../../Image_SVG_Resources/tick-circle.svg";
import EmailField from "./EmailField";
import { useAppContext } from "../../context";
import { Button } from "../Button/Button";
import CloseButton from "../CloseButton/CloseButton";
import { useNavigate } from "react-router-dom";

const LoginPopup = ({ closePopup, addBlog }) => {
  const { user } = useAppContext();
  const navigate = useNavigate();

  const handleNavigateToHome = () => {
    navigate(`/`);
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  };
  return (
    <div className="popup-background">
      <div className="popup-container">
        <div className="x-back-button-container">
          <CloseButton onClick={addBlog ? handleNavigateToHome : closePopup} />
        </div>
        {!addBlog ? (
          user === "" ? (
            <>
              <div className="login-text">შესვლა</div>
              <EmailField />
            </>
          ) : (
            <>
              <TICK_CIRCLE className="tick-circle" />
              <div className="login-text">წარმატებული ავტორიზაცია</div>
              <Button isFullWidth={true} text={"კარგი"} onClick={closePopup} />
            </>
          )
        ) : (
          <>
            <TICK_CIRCLE className="tick-circle" />
            <div className="login-text">ბლოგი აიტვირთა</div>
            <Button isFullWidth={true} text={"მთავარ გვერძე გადასვლა"} onClick={handleNavigateToHome} />
          </>
        )}
      </div>
    </div>
  );
};

export default LoginPopup;
