import { faAlignJustify, faBell, faExclamationCircle, faHouseUser, faSearch, faUser } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/logo.png'
import './TopBar.scss'

function TopBar(props) {
  return (
    <div className="dashboard__top-bar-wrapper">
      <div className="dashboard__top-bar">
        <div className="dashboard__top-bar__left">
          <NavLink to="/">
            <span>
              <FontAwesomeIcon icon={faAlignJustify} />
            </span>
          </NavLink>
          <NavLink to="/">
            <span>
              <FontAwesomeIcon icon={faHouseUser} />
            </span>
          </NavLink>
          <div className="dashboard__top-bar__left__input">
            <input className="dashboard__top-bar__search-bar" />
            <button>
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>
        </div>
        <div className="dashboard__top-bar__logo">
          <img src={logo} alt="" />
        </div>
        <div className="dashboard__top-bar__right">
          <NavLink to="/">
            <span>
              <FontAwesomeIcon icon={faBell} />
            </span>
          </NavLink>
          <NavLink to="/">
            <span>
              <FontAwesomeIcon icon={faExclamationCircle} />
            </span>
          </NavLink>
          <button className="dashboard__top-bar__right__btn">
            <span>
              <FontAwesomeIcon icon={faUser} />
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default TopBar;