import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo.png'
import './TopBar.scss'

function TopBar(props) {
  return (
    <div className="top-bar-wrapper">
      <div className="container-fluid">
        <div className="top-bar">
          <div className="top-bar__logo">
            <NavLink to="/">
              <img src={logo} alt="logo" />
            </NavLink>
          </div>
          <div className="top-bar__right">
            <NavLink to="/">test</NavLink>
            <NavLink to="/">test</NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopBar;