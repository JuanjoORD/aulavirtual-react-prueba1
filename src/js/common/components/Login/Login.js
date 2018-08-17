import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Redirect } from 'react-router-dom';
import LoginForm from './LoginForm';
import './login.css';

class Login extends PureComponent {
    static propTypes = {
        nameError: PropTypes.bool.isRequired,
        passError: PropTypes.bool.isRequired,
        onSubmit: PropTypes.func.isRequired,
        hasNameError: PropTypes.func.isRequired,
        hasPassError: PropTypes.func.isRequired,
    };

    componentDidMount(props) {
        this.state = { prueba: true };
    }

    render() {
        const { onSubmit } = this.props;
        if (localStorage.getItem('token')) {
            return (<Redirect to="/page" />);
        }
        return (
            <div>
                <div className="row">
                    <div className="col-lg-8 col-md-8 col-sm-8 offset-lg-1 offset-md-1 offset-sm-1 offset-sm-0">
                        <h1>Bienvenido a CianStarter</h1>
                        <p>Página de login</p>
                    </div>
                </div>
                <br />
                <div className="row login-wrapper">
                    <div className="col-lg-4 col-md-4 col-sm-11 offset-lg-4 offset-md-4 offset-sm-3 offset-sm-0">
                        <div className="panel panel-flat">
                            <div className="panel-body">
                                <p className="text-center pv">INGRESE SU USUARIO Y CONTRASEÑA.</p>
                                <LoginForm onSubmit={onSubmit} />
                                <br />
                                <p>Regresar a <a href="/">Home</a></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
