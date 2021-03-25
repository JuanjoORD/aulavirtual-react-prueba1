import PropTypes from 'prop-types';
import React, { Component } from 'react';
import {Link, Redirect} from 'react-router-dom';
import '../Login/login.css';
import LoadMask from "Utils/LoadMask/LoadMask";

import VerifyEmailUserForm from './VerifyEmailUserForm';

class VerifyEmailUser extends Component {
    state = {
        emailConfirmed: false
    }    

    render() {
        const { loader, verifyEmail, changeMyPassword } = this.props;
        
        console.log("Verify Email USer props:", this.props)

        if (localStorage.getItem('token')) {
            return (<Redirect to="/" />);
        }
        return (
            <div className="blue-gradient-bg">
                <div className="d-flex flex-column align-items-center pt-3 bienvenida">
                    <h1 className="text-center">Bienvenido a CianStarter</h1>
                    <h3>Verificar correo electrónico</h3>
                    <p>
                        Ingrese el correo electrónico con el que se registro, para poder enviarle un link de recuperación de contraseña.                        
                    </p>
                    <p>Este link de recuperación tendra una vigencia de 5 minutos.</p>
                </div>
                <br />
                <div className="login-wrapper">
                    <div className="card card-login col-lg-3 col-md-4 col-11">
                        <h5 className="text-center pv">Verificar correo electrónico</h5>
                        <LoadMask loading={loader} light>
                            <VerifyEmailUserForm onSubmit={verifyEmail} />
                            <center>
                                <span>
                                    ¿Ya tienes contraseña?<br/>
                                    <Link to="/login">Ir al login</Link>
                                </span>
                            </center>
                        </LoadMask>
                    </div>
                </div>
            </div>
        );
    }
}

export default VerifyEmailUser;
