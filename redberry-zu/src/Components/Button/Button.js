import React from 'react'
import "./Button.css"

export const Button = ({text, onClick, isFullWidth}) => {
  return (
    <div className={`button ${isFullWidth ? 'button-full-width' : ''}`} onClick={onClick}>{text}</div>
  )
}
