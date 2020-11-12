import React from 'react';
import PropTypes from 'prop-types';
import LoginForm from '../Components/LoginForm';
import logo from '../assets/HomePage/logo-footer.png'
import backgroundLeft from '../assets/Login/background-left.svg'

LoginPage.propTypes = {

};

function LoginPage(props) {
    return (
        <div className="login-wrapper">
            <div className="login-wrapper__logo">
                <img src={logo} alt="Logo"/>
            </div>
            <LoginForm />
            <img src={backgroundLeft} alt=""/>
        </div>
    );
}

export default LoginPage;