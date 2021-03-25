import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import '../Login/login.css';
import LoadMask from "Utils/LoadMask/LoadMask";

import RestorePasswordForm from './RestorePasswordForm';

class RestorePassword extends Component {

    recoverPassword = (data) => {
        const { changeMyPassword, match } = this.props
        changeMyPassword({...data, "token": match.params.token})
    }

    render() {
        const { loader } = this.props;
        if (localStorage.getItem('token')) {
            return (<Redirect to="/" />);
        }
        return (
            <div className="blue-gradient-bg">
                <div className="d-flex flex-column align-items-center pt-3 bienvenida">
                    <h1 className="text-center">Bienvenido a CianStarter</h1>
                    <h4>Recuperar contraseña</h4>
                </div>
                <br />
                <div className="login-wrapper">
                    <div className="card card-login col-lg-3 col-md-4 col-11">
                        <h5 className="text-center pv">Ingresa tu nueva contraseña</h5>
                        <LoadMask loading={loader} light>
                            <RestorePasswordForm onSubmit={this.recoverPassword} />
                            <span>Click para&nbsp;<Link to="/login">ir al login</Link></span>
                        </LoadMask>
                    </div>
                </div>
            </div>
        );
    }
}

export default RestorePassword;
