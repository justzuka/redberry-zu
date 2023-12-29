import React from 'react'
import "../Popup/LoginPopup.css";
import { ReactComponent as X } from "../../Image_SVG_Resources/x.svg";

const CloseButton = ({onClick}) => {
  return (
    <div className="x-back-button" onClick={onClick}>
        <X className="x-back-icon" />
    </div>
  )
}

export default CloseButton