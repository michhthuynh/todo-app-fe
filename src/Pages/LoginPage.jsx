import React from 'react';
import PropTypes from 'prop-types';
import LoginForm from '../Components/LoginForm';
import logo from '../assets/logo-footer.png'
import backgroundLeft from '../assets/Login/background-left.svg'
import backgroundRight from '../assets/Login/background-right.svg'
import { NavLink, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

LoginPage.propTypes = {

};

function LoginPage(props) {
  const logged = useSelector(state => state.user.isAuthentication)

  return (
    !logged ?
      <div className="login-wrapper">
        <NavLink to="/">
          <div className="login-wrapper__logo">
            <img src={logo} alt="Logo" />
          </div>
        </NavLink>
        <LoginForm />
        <div className="bottom-link">
          <NavLink to="/">Privacy Policy</NavLink>
          <NavLink to="/">Terms of Service</NavLink>
        </div>
        <div className="bottom-branch">
          <hr />
          <img src="https://d2k1ftgv7pobq7.cloudfront.net/meta/c/p/res/images/16006ae28f149063408d601e8c80eddc/atlassian-logo-blue-small.svg" alt="" />
        </div>
        <ul className="footer__list">
          <li>
            <NavLink to="/">Templates</NavLink>
          </li>
          <li>
            <NavLink to="/">Pricing</NavLink>
          </li>
          <li>
            <NavLink to="/">Apps</NavLink>
          </li>
          <li>
            <NavLink to="/">Jobs</NavLink>
          </li>
          <li>
            <NavLink to="/">Blogs</NavLink>
          </li>
          <li>
            <NavLink to="/">Developers</NavLink>
          </li>
          <li>
            <NavLink to="/">About</NavLink>
          </li>
          <li>
            <NavLink to="/">Help</NavLink>
          </li>
          <li>
            <NavLink to="/">Legal</NavLink>
          </li>
          <li>
            <NavLink to="/">Cookie Settings</NavLink>
          </li>
          <li>
            <NavLink to="/">Privacy</NavLink>
          </li>
        </ul>
        <div className="background-left">
          <img src={backgroundLeft} alt="" />
        </div>
        <div className="background-right">
          <img src={backgroundRight} alt="" />
        </div>
      </div>
      : <Redirect to="/dashboard" />
  );
}

export default LoginPage;