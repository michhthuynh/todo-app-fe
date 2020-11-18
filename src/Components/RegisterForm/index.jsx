import React, { useState } from 'react';
import { Formik, FastField, Form } from 'formik'
import InputField from '../../custom-fields/InputField';
import { NavLink, useHistory } from 'react-router-dom';
import * as Yup from 'yup'
import './RegisterForm.scss'
import API from '../../utils/API'
import { useDispatch } from 'react-redux';
import { addUserID, verifyLogin } from '../../actions/user';


const msgRequired = '* This field is required'
const msgUserFail = '* Username is not available'
const msgPasswordFail = '* Password is not available'
const msgFullNameFail = '* Full name is not available'
const msgValidateFail = '* Password is not match'
const msgEmailFail = '* Email is not available'

function RegisterForm(props) {
  const history = useHistory();
  const dispatch = useDispatch()
  const [msgError, setMsgError] = useState('')
  const initialValues = {
    username: '',
    email: '',
    password: '',
    validate: '',
    fullName: '',
  }

  const validationSchema = Yup.object().shape({
    username: Yup.string().required(msgRequired).min(6, msgUserFail).max(16, msgUserFail).trim(msgUserFail),
    password: Yup.string().required(msgRequired).min(6, msgPasswordFail).max(16, msgPasswordFail).trim(msgPasswordFail),
    validate: Yup.string().required(msgRequired).min(6, msgValidateFail).max(16, msgValidateFail).trim(msgValidateFail),
    fullName: Yup.string().required(msgRequired).min(6, msgFullNameFail).trim(msgFullNameFail),
    email: Yup.string().required(msgRequired).min(6, msgEmailFail).trim(msgEmailFail).email('Email is invalid')
  })

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      enableReinitialize={true}
      onSubmit={({ username, email, password, validate, fullName }, actions) => {
        if (password === validate) {
          API.post('/auth/signup', {
            username,
            email,
            password,
            fullName
          }).then(result => {
            if (result.status === 200) {
              localStorage.setItem('token', result.data.token)
              localStorage.setItem('user_id', result.data.id)
              dispatch(verifyLogin(true))

              history.replace('/dashboard')
            }
          }).catch(err => {
            // validate server is down
            if (err.response === undefined) {
              setMsgError('Cannot register! Please contact to admin.')
              return
            }

            if (err.response.status === 409) {
              setMsgError('Username or Email is registered')
            } else {
              if (err.response.status === 400) {
                setMsgError(err.response.data.message)
              } else {
                setMsgError('Cannot register! Please contact to admin.')
              }
            }
          })

        } else {
          actions.resetForm({
            values: {
              username: username,
              email: email,
              password: '',
              validate: '',
              fullName: fullName,
            }
          })
          setMsgError('* Password is not match')
        }
      }}
    >
      {
        formikProps => {
          return (
            <Form className="register-form" onSubmit={formikProps.handleSubmit}>
              <div className="register-form__title">
                Sign up for your account
              </div>
              {
                msgError && <div className="register-form__error-message">
                  {msgError}
                </div>
              }
              <FastField
                name="username"
                component={InputField}

                className='register-form'
                placeholder="Enter username"
              />
              <FastField
                name="email"
                component={InputField}

                className="register-form"
                type="email"
                placeholder="Enter email address"
              />

              <FastField
                name="fullName"
                component={InputField}

                className="register-form"
                type="text"
                placeholder="Enter full name"
              />

              <FastField
                name="password"
                component={InputField}

                className="register-form"
                type="password"
                placeholder="Enter password"
              />
              <FastField
                name="validate"
                component={InputField}

                className="register-form"
                type="password"
                placeholder="Enter password again"
              />
              <button type="submit" className="register-form__btn">Sign Up</button>
              <hr />
              <div className="register-group">
                <NavLink to="/auth/login">Already have an Atlassian account? Log in</NavLink>
              </div>
            </Form>
          )
        }
      }
    </Formik>
  );
}

export default RegisterForm;