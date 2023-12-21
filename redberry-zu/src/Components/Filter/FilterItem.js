import React from 'react'
import "./FilterItem.css"

export const FilterItem = ({title, backgroundColor, textColor}) => {
  return (
    <div className='filter-item' style={{ backgroundColor: `${backgroundColor}14`, color: backgroundColor }}>{title}</div>
  )
}
