import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Formik, FastField, Form } from 'formik'
import InputField from '../../custom-fields/InputField';
import { NavLink, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faMicrosoft, faApple } from "@fortawesome/free-brands-svg-icons"
import './LoginForm.scss'
import * as Yup from 'yup'
import { useDispatch } from 'react-redux'
import API from '../../utils/API';
import { addUserID, verifyLogin } from '../../actions/user';

LoginForm.propTypes = {

};

const msgRequired = '* This field is required'
const msgUserFail = '* Username is not available'
const msgPasswordFail = '* Password is not available'

function LoginForm(props) {
  const history = useHistory();
  const dispatch = useDispatch()
  const [msgError, setMsgError] = useState('')

  const initialValue = {
    username: '',
    password: '',
  }
  const validationSchema = Yup.object().shape({
    username: Yup.string().required(msgRequired).min(6, msgUserFail).max(16, msgUserFail).trim(msgUserFail),
    password: Yup.string().required(msgRequired).min(6, msgPasswordFail).max(16, msgPasswordFail).trim(msgPasswordFail),
  })
  return (
    <Formik
      initialValues={initialValue}
      validationSchema={validationSchema}
      onSubmit={({ username, password }, { resetForm }) => {
        API.post("/auth/login", { username, password }).then(result => {
          const { token, id } = result.data
          if (result.status === 200) {
            localStorage.setItem('token', token)
            localStorage.setItem('user_id', id)
            dispatch(verifyLogin(true))

            history.replace('/dashboard')
          }
        }).catch(err => {
          const code = err.response.status
          const msg = err.response.data.message
          if (code === 401) {
            setMsgError(`* ${msg}`)
          } else {
            setMsgError("* Cannot register! Please contact to admin.")
          }
        })

        resetForm({
          values: {
            username: username,
            password: ''
          }
        })
      }}
    >
      {
        formikProps => {
          return (
            <Form className="login-form">
              <div className="login-form__title">
                Log in to Bello
              </div>
              {
                msgError && <div className="login-form__error-message">
                  {msgError}
                </div>
              }
              <FastField
                name="username"
                component={InputField}

                placeholder="Enter username"
                className="login-form"
              />
              <FastField
                name="password"
                component={InputField}

                type="password"
                placeholder="Enter password"
                className="login-form"
              />
              <button type="submit" className="login-form__btn">Log in</button>
              <div className="login-form__separator">
                OR
              </div>
              <NavLink to="/" className="login-form__another">
                <span>
                  <FontAwesomeIcon icon={faGoogle} />
                </span>
                Continue with Google
              </NavLink>
              <NavLink to="/" className="login-form__another">
                <span>
                  <FontAwesomeIcon icon={faMicrosoft} />
                </span>
                Continue with Microsoft
              </NavLink>
              <NavLink to="/" className="login-form__another">
                <span>
                  <FontAwesomeIcon icon={faApple} />
                </span>
                Continue with Apple
              </NavLink>
              <NavLink to="/" className="login-form__sso">
                Log in with SSO
              </NavLink>
              <hr />
              <div className="register-group">
                <NavLink to="/">Can't log in?</NavLink>
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