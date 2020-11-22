import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import logo from '../assets/logo.png'
import '../assets/HomePage/HomePage.scss'
import hero from '../assets/HomePage/hero-a.svg'
import banner1 from '../assets/HomePage/banner-1.PNG'
import banner2 from '../assets/HomePage/banner-2.PNG'
import list1 from '../assets/HomePage/list-1.png'
import list2 from '../assets/HomePage/list-2.png'
import list3 from '../assets/HomePage/list-3.png'
import logo2 from '../assets/logo-footer.png'
import CarouselComponent from '../Components/Carousel/index';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

HomePage.propTypes = {
  logged: PropTypes.bool.isRequired
};

HomePage.defaultProps = {
  logged: false
}

function HomePage(props) {
  const username = useSelector(state => state.user.username)
  const logged = useSelector(state => state.user.isAuthentication)

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
            {
              logged ?
                <NavLink to='/dashboard' className="top-bar__right__dashboard">Go to your dashboard</NavLink> :
                <React.Fragment>
                  <NavLink to="/auth/login">
                    Login
                  </NavLink>
                  <NavLink to="/auth/register">
                    Register
                  </NavLink>
                </React.Fragment>
            }
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
                Whether it’s for work, a side project or even the next family vacation, Bello helps your team stay organized.
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
                Dive into the details by adding comments, attachments, due dates, and more directly to Bello cards. Collaborate on projects from beginning to end.
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="carousel-wrapper">
        <div className="carousel">
          <div className="carousel__title">
            How it works
          </div>
          <div className="carousel__info">
            Whether it’s for work, a side project or even the next family vacation, Bello helps your team stay organized.
          </div>
          <CarouselComponent />
        </div>

      </div> */}
      <div className="feature-wrapper">
        <div className="container">
          <div className="feature">
            <div className="feature__title">
              Bello your way
            </div>
            <div className="feature__info">
              Use Bello the way your team works best. We’ve got the flexibility & features to fit any team’s style.
            </div>
            <div className="feature__list">
              <div className="feature__list__item team">
                <div className="feature__list__item__image">
                  <img src={list1} />
                </div>
                <div className="feature__list__item__title">
                  The Team Playbook
                </div>
                <div className="feature__list__item__info">
                  It’s easy to get your team up and running with Bello. We’ve collected all of the boards and tools your team needs to succeed in one handy resource.
                </div>
                <button className="feature__list__item__btn">
                  Make A Game Plan
                </button>
              </div>
              <div className="feature__list__item integrate">
                <div className="feature__list__item__image">
                  <img src={list2} />
                </div>
                <div className="feature__list__item__title">
                  A Productivity Platform
                </div>
                <div className="feature__list__item__info">
                  Integrate the apps your team already uses directly into your workflow. Power-Ups turn Bello boards into living applications to meet your team's unique business needs.
                </div>
                <button className="feature__list__item__btn">
                  Power-Up Your Workflow
                </button>
              </div>
              <div className="feature__list__item app">
                <div className="feature__list__item__image">
                  <img src={list3} />
                </div>
                <div className="feature__list__item__title">
                  Always In Sync
                </div>
                <div className="feature__list__item__info">
                  No matter where you are, Bello stays in sync across all of your devices. Collaborate with your team anywhere, from sitting on the bus to sitting on the beach.
                </div>
                <button className="feature__list__item__btn">
                  Available on Android
                </button>
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
            Sign up and join over 1,000,000 teams worldwide who are using Bello to get more done.
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
            <img className="footer__image" src={logo2} width="150"></img>
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