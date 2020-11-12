import React from 'react';
import PropTypes from 'prop-types';
import { Formik, FastField, Form } from 'formik'
import InputField from '../../custom-fields/InputField';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faMicrosoft, faApple } from "@fortawesome/free-brands-svg-icons"
import './LoginForm.scss'

LoginForm.propTypes = {

};

function LoginForm(props) {
  const initialValue = {
    username: '',
    password: '',
  }
  return (
    <Formik

    >
      {
        formikProps => {
          return (
            <Form className="login-form">
              <div className="login-form__title">
                Log in to Bello
              </div>
              <FastField
                name="username"
                component={InputField}

                placeholder="Enter username"
              />
              <FastField
                name="password"
                component={InputField}

                type="password"
                placeholder="Enter password"
              />
              <button type="submit" className="login-form__btn">Log in</button>
              <div className="login-form__separator">
                OR
              </div>
              <NavLink to="/" className="login-form__another">
                <span>
                  <FontAwesomeIcon icon={faGoogle}/>
                </span>
                Continue with Google
              </NavLink>
              <NavLink to="/" className="login-form__another">
                <span>
                  <FontAwesomeIcon icon={faMicrosoft}/>
                </span>
                Continue with Microsoft
              </NavLink>
              <NavLink to="/" className="login-form__another">
                <span>
                  <FontAwesomeIcon icon={faApple}/>
                </span>
                Continue with Apple
              </NavLink>
              <NavLink to="/" className="login-form__sso">
                Log in with SSO
              </NavLink>
              <hr/>
              <div className="register-group">
                <NavLink to="/">Can't log in</NavLink>
                <NavLink to="/auth/register">Sign up for an account</NavLink>
              </div>
            </Form>
          )
        }
      }
    </Formik>
  );
}

export default LoginForm;