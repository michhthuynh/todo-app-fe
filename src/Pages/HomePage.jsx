import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import logo from '../assets/logo.png'
import '../assets/HomePage/HomePage.scss'
import hero from '../assets/HomePage/hero-a.svg'
import banner1 from '../assets/HomePage/banner-1.PNG'
import banner2 from '../assets/HomePage/banner-2.PNG'
import logo2 from '../assets/HomePage/logo-footer.png'

HomePage.propTypes = {

};

function HomePage(props) {
  return (
    <div className="wrapper">
      <div className="container-fluid top-bar-wrapper">
        <div className="top-bar">
          <div className="top-bar__logo">
            <NavLink to="/">
              <img src={logo} alt="logo" />
            </NavLink>
          </div>
          <div className="top-bar__right">
            <NavLink to="/">
              Login
        </NavLink>
            <NavLink to="/">
              Register
        </NavLink>
          </div>
        </div>
      </div>
      <div className="hero-wrapper">
        <div className="container">
          <div className="hero">
            <div className="hero__left">
              <div className="hero__left__title">
                Bello helps teams work more collaboratively and get more done.
            </div>
              <div className="hero__left__info">
                Bello's boards, lists, and cards enable teams to organize and prioritize projects in a fun, flexible, and rewarding way.
            </div>
            </div>
            <div className="hero__right">
              <img src={hero} alt="banner" />
            </div>
          </div>
        </div>
      </div>
      <div className="collaborate-wrapper">
        <div className="container ">
          <div className="collaborate">
            <div className="collaborate__left">
              <div className="collaborate__left__title">
                Work with any team
              </div>
              <div className="collaborate__left__info">
                Whether it’s for work, a side project or even the next family vacation, Trello helps your team stay organized.
              </div>
              <NavLink className="collaborate__left__start" to="/">Start doing →</NavLink>
            </div>
            <div className="collaborate__right">
              <img src={banner1} alt="banner" />
            </div>
          </div>
        </div>
      </div>
      <div className="teams-wrapper">
        <div className="container">
          <div className="teams">
            <div className="teams__left">
              <img src={banner2} alt="banner" />
            </div>
            <div className="teams__right">
              <div className="teams__right__title">
                Information at a glance
              </div>
              <div className="teams__right__info">
                Dive into the details by adding comments, attachments, due dates, and more directly to Trello cards. Collaborate on projects from beginning to end.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="get-started-wrapper">
        <div className="get-started">
          <div className="get-started__title">
            Start Planning Today
        </div>
          <div className="get-started__info">
            Sign up and join over 1,000,000 teams worldwide who are using Trello to get more done.
        </div>
          <NavLink to='/'>Get Started – It’s Free!</NavLink>
        </div>
      </div>
      <div className="footer-wrapper">
        <div className="container">
          <div className="footer">
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
            <img class="footer__image" src={logo2} width="150"></img>
            <div className="footer__copyright">
              © Copyright 2020. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomePage;