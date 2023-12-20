import React from 'react'
import { ReactComponent as REDBERRY_LOGO } from '../../Image_SVG_Resources/REDBERRY_LOGO.svg';
import './NavBar.css';
import { Button } from '../Button/Button';

export const NavBar = () => {
  return (
    <div className='navbar-container'>
        <REDBERRY_LOGO className="redberry-logo"/>
        <Button text={"შესვლა"}></Button>
    </div>
  )
}

